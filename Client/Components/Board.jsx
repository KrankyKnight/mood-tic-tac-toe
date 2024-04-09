import React, { useEffect } from 'react';
import Row from './Row.jsx';
import { useStore } from '../Store/useStore.js';

const Board = () => {

  /* STATE */

  const {
    boardSize, setBoardSize,
    board, setBoard,
    players, setPlayers,
    message, setMessage,
    currentPlayer, setCurrentPlayer,
    score, setScore,
    gameOver, setGameOver,
    gameReady, setGameReady,
    inactivePlayer
  } = useStore((state) => state);

  /* GAME FUNCTIONS */

  // Player Setup

  const setUpPlayers = (event) => {
    event.preventDefault();
    const player1Field = document.getElementById('player1-name').value;
    const player2Field = document.getElementById('player2-name').value;
    const {player1, player2} = checkFieldEntries(player1Field, player2Field);
    setPlayers(player1, player2);
    setScore({
      [player1]: 0,
      [player2]: 0
    });
    setGameReady(true);
  };

  const checkFieldEntries = (player1Field, player2Field) => {
    let player1 = player1Field.replace(/\s*/, '').length ? player1Field : 'X';
    let player2 = player2Field.replace(/\s*/, '').length ? player2Field : 'O';
    if(player1Field.replace(/\s*/, '') === 'X') player1 = 'Joker';
    if(player2Field.replace(/\s*/, '') === 'O') player2 = 'Riddler';
    if(player1Field.replace(/\s*/, '') === player2Field.replace(/\s*/, '') && player1Field.replace(/\s*/, '').length) {
      player1 = 'Max Carver';
      player2 = 'Charlie Carver';
    };
    return {
      player1: player1,
      player2: player2
    };
  }

  // Board Changes

  const increaseBoard = () => {
    if(boardSize < 7) setBoardSize(boardSize + 1);
  };
  
  const decreaseBoard = () => {
    if(boardSize > 3) setBoardSize(boardSize - 1);
  };

  // End Game Functions

  const checkForWinner = () => {
    const newBoard = {...board};
    let victoryCondition = ``;
    for(let counter = 0; counter < boardSize; counter++) {
      victoryCondition += `${inactivePlayer}`;
    };
    checkRows(newBoard, victoryCondition);
    checkColumns(newBoard, victoryCondition);
    checkDiagonals(newBoard, victoryCondition);
    if(newBoard.dashes === 0) return draw();
  };

  const checkRows = (newBoard, victoryCondition) => {
    for(let row = 0; row < boardSize; row++) {
      let result = '';
      for(let column = 0; column < boardSize; column++) {
        result += `${newBoard[`${row}${column}`]}`
      };
      if(result === victoryCondition) return winner();
    };
  };

  const checkColumns = (newBoard, victoryCondition) => {
    for(let column = 0; column < boardSize; column++) {
      let result = '';
      for(let row = 0; row < boardSize; row++) {
        result += `${newBoard[`${row}${column}`]}`;
      };
      if(result === victoryCondition) return winner();
    };
  };

  const checkDiagonals = (newBoard, victoryCondition) => {
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
    newScore[inactivePlayer]++;
    setGameOver(true);
    setMessage(`Player ${players.valueRef[inactivePlayer]} wins!!!`);
    setScore(newScore);
  };
  
  const draw = () => {
    setGameOver(true);
    setMessage('It\'s a Draw!!!');
  };

  // Resets

  const softReset = () => {
    const newBoard = {};
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
  
  const fullReset = () => {
    softReset();
    const player1 = players.valueRef['X'];
    const player2 = players.valueRef['O'];
    setScore({[player1]: 0, [player2]: 0});
  };

  const restartGame = () => {
    fullReset();
    setGameReady(false);
  }

  /* USEEFFECT HOOKS */

  useEffect(fullReset, [boardSize]);
  useEffect(checkForWinner, [board]);

  /* ROW GENERATION */

  const rows = [];
  
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
            Current Player: {players.valueRef[currentPlayer] + ': ' + currentPlayer} 
            {!gameOver && 
              <button className='soft-reset word-glow' onClick={softReset}>
                Soft Reset
              </button>}
          </h2>
          {message && 
            <div className='end-game'>
              {message} 
              <button className='word-glow' id='reset-board' onClick={softReset}>
                Reset Board
              </button>
            </div>}
          {rows}
          <h3>SCORES</h3>
          <p>
            <span className='player-1'>
              {`Player: ${players.valueRef['X']}: ${score[players.valueRef['X']]}`}
            </span>
            <span className='player-2'>
              {`Player: ${players.valueRef['O']}: ${score[players.valueRef['O']]}`}
            </span>
          </p>
        <button className='word-glow' id='full-reset' onClick={fullReset}>
          Full Reset
        </button>
        <button className='word-glow' id='full-reset' onClick={restartGame}>
          Resart Game
        </button>
      </> :
      <>
        <div>
            <input id='player1-name' type='text'/>
            <input id='player2-name' type='text'/>
            <button id="game-start-button" onClick={setUpPlayers}>Start</button>
        </div>
      </>}
    </div>
  );
};

export default Board;
