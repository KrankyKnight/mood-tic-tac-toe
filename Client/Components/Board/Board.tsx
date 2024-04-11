import React, { useEffect } from 'react';
import { useBoardStore, usePlayerStore, useGameStore } from '../../Store';
import Row from '../Row';
import StartMenu from '../StartMenu';
import ResetButton from '../ResetButton';

type propsType = {
  key: string,
  children: string
}

type Board = {
  [key: string]: string
};

type FullBoard = Board & {
  dashes?: number
};

const Board = (_props: propsType): JSX.Element => {

  const board =  useBoardStore((state) => state.board);
  const boardSize = useBoardStore((state) => state.boardSize);
  const setBoard = useBoardStore((state) => state.setBoard);
  const increaseBoard = useBoardStore((state) => state.increaseBoard);
  const decreaseBoard = useBoardStore((state) => state.decreaseBoard);
  const player1 = usePlayerStore((state) => state.player1);
  const player2 = usePlayerStore((state) => state.player2);
  const symbolToPlayer = usePlayerStore((state) => state.symbolToPlayer);
  const currentPlayer = usePlayerStore((state) => state.currentPlayer);
  const inactivePlayer = usePlayerStore((state) => state.inactivePlayer);
  const setCurrentPlayer = usePlayerStore((state) => state.setCurrentPlayer);
  const gameReady = useGameStore((state) => state.gameReady);
  const gameOver = useGameStore((state) => state.gameOver);
  const message = useGameStore((state) => state.message);
  const score = useGameStore((state) => state.score);
  const setGameOver = useGameStore((state) => state.setGameOver);
  const setGameReady = useGameStore((state) => state.setGameReady);
  const setMessage = useGameStore((state) => state.setMessage);
  const setScore = useGameStore((state) => state.setScore);

  /* GAME FUNCTIONS */

  // Resets
  const softReset = (event?: React.MouseEvent<HTMLElement>): void => {
    if(event) event.preventDefault();
    const newBoard: FullBoard = {};
    for(let i = 0; i < boardSize; i++){
      for(let j = 0; j < boardSize; j++){
        newBoard[`${i}${j}`] = '-';
      };
    };
    newBoard.dashes = Math.pow(boardSize, 2);
    setBoard(newBoard)
    setGameOver(false);
    setMessage('');
    setCurrentPlayer('X');
  };

  const hardReset = (event?: React.MouseEvent<HTMLElement>) => {
    if(event) event.preventDefault();
    softReset();
    setScore({[player1]: 0, [player2]: 0});
  };

  const restartGame = (event: React.MouseEvent<HTMLElement>) => {
    if(event) event.preventDefault();
    hardReset();
    setGameReady(false);
  }

  // End Game Functions
  const checkForWinner = () => {
    const newBoard = {...board};
    let victoryCondition: string = ``;
    for(let counter = 0; counter < boardSize; counter++) {
      victoryCondition += `${inactivePlayer}`;
    };
    checkRows(newBoard, victoryCondition);
    checkColumns(newBoard, victoryCondition);
    checkDiagonals(newBoard, victoryCondition);
    if(newBoard.dashes === 0) return draw();
  };

  const checkRows = (newBoard: FullBoard, victoryCondition: string) => {
    for(let row = 0; row < boardSize; row++) {
      let result = '';
      for(let column = 0; column < boardSize; column++) {
        result += `${newBoard[`${row}${column}`]}`
      };
      if(result === victoryCondition) return winner();
    };
  };

  const checkColumns = (newBoard: FullBoard, victoryCondition: string) => {
    for(let column = 0; column < boardSize; column++) {
      let result = '';
      for(let row = 0; row < boardSize; row++) {
        result += `${newBoard[`${row}${column}`]}`;
      };
      if(result === victoryCondition) return winner();
    };
  };

  const checkDiagonals = (newBoard: FullBoard, victoryCondition: string) => {
    let diagonal = '';
    for(let row = 0; row < boardSize; row++) {
      diagonal += `${newBoard[`${row}${row}`]}`;
    };
    if(diagonal === victoryCondition) return winner();
    diagonal = '';
    for(let row = 0; row < boardSize; row++) {
      diagonal += `${newBoard[`${row}${boardSize-1-row}`]}`;
    }
    if(diagonal === victoryCondition) return winner();
  };

  const winner = () => {
    const newScore = {...score};
    newScore[symbolToPlayer[inactivePlayer]]++;
    setGameOver(true);
    setMessage(`Player ${symbolToPlayer[inactivePlayer]} wins!!!`);
    setScore(newScore);
  };
  
  const draw = () => {
    setGameOver(true);
    setMessage('It\'s a Draw!!!');
  };

  /* USEEFFECT HOOKS */
  useEffect(hardReset, [boardSize]);
  useEffect(() => setScore({
    [player1]: 0,
    [player2]: 0
  }), [player1, player2]);
  useEffect(checkForWinner, [board]);

  /* ROW GENERATION */

  const rows: JSX.Element[] = [];
  
  for(let i = 0; i < boardSize; i++){
    rows.push(
      <div key={`Row-div${i}`}>
        <Row 
          key={`Row${i}`} 
          index={i}
        />
      </div>
    );
  };

  return (
    <div id='game'>
      { gameReady ?
        <>
          <h1>
            <button className='board-change word-glow' onClick={decreaseBoard}>
              -
            </button>
            Tic Tac Toe
            <button className='board-change word-glow' onClick={increaseBoard}>
              +
            </button>
          </h1>
          <h2>
            Current Player: {symbolToPlayer[currentPlayer] + ': ' + currentPlayer} 
            {!gameOver && 
              <ResetButton 
                key='duringGameReset' 
                resetType='soft-reset'
                resetSelection={softReset} 
                buttonLabel='Soft Reset'
              />}
          </h2>
          {message && 
            <div className='end-game'>
              {message} 
              <ResetButton 
                key='endGameReset' 
                resetType='soft-reset'
                resetSelection={softReset}
                buttonLabel='Reset Board'
              />
            </div>}
          {rows}
          <h3>SCORES</h3>
          <p>
            <span className='player-1'>
              {`Player: ${player1}: ${score[player1]}`}
            </span>
            <span className='player-2'>
              {`Player: ${player2}: ${score[player2]}`}
            </span>
          </p>
        <ResetButton 
          key='duringGamehardReset' 
          resetType='hard-reset'
          resetSelection={hardReset}
          buttonLabel='Hard Reset'
        />
        <ResetButton 
          key='suringGameRestart' 
          resetType='restart-reset'
          resetSelection={restartGame} 
          buttonLabel='Restart Game'
        />
      </> :
      <>
        <StartMenu />
      </>}
    </div>
  );
};

export default Board;
