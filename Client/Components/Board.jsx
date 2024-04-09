import React, {useState, useEffect, Fragment} from 'react';
import Row from './Row.jsx';

const Board = () => {

  /* -- STATE -- */
  const [board, setBoard] = useState({}); // covered
  const [currentPlayer, changePlayer] = useState('X');
  const [gameOver, changeGameStatus] = useState(false);
  const [message, updateMessage] = useState('');
  const [score, setScore] = useState({'X':0, 'O':0});
  const [boardSize, changeBoardSize] = useState(3); // covered
  
  /* --- HELPER FUNCTIONS --- */

  // reset the board but leave the current scores
  const resetBoard = () => {
    const board = {};
    for(let i = 0; i < boardSize; i++){
      for(let j = 0; j < boardSize; j++){
        board[`${i}${j}`] = '-';
      }
    }
    board.dashes = Math.pow(boardSize, 2);
    setBoard(board);
    changeGameStatus(false);
    updateMessage('');
    changePlayer('X');
  };

  // reset the board and current scores
  const fullReset = () => {
    resetBoard();
    setScore({'X':0, 'O':0});
  };

  // increase board size by 1 (ridiculous but fun)
  const increaseBoard = () => {
    if(boardSize < 7) changeBoardSize(boardSize + 1);
  };

  // decrease board size by 1
  const decreaseBoard = () => {
    if(boardSize > 1) changeBoardSize(boardSize - 1);
  };

  /* --- VICTORY CONDITIONS --- */
  // reference to player not taking their turn
  const inactivePlayer = currentPlayer === 'X' ? 'O' : 'X';

  // winner result function
  const winner = () => {
    const newScore = {...score};
    newScore[inactivePlayer]++;
    // update game status, score, and victory message state
    changeGameStatus('true');
    updateMessage(`Player ${inactivePlayer} wins!!!`);
    setScore(newScore);
  };

  // draw result function
  const draw = () => {
    //Update game status and victory message state
    changeGameStatus('true');
    updateMessage('It\'s a Draw!!!');
  };

  // check for winner
  const checkForWinner = () => {
    const b = {...board};
    const iP = inactivePlayer;
    let victoryCondition = ``;
    for(let i = 0; i < boardSize; i++) {
      victoryCondition += `${iP}`;
    }

    // check the rows
    for(let i = 0; i < boardSize; i++) {
      let result = '';
      for(let j = 0; j < boardSize; j++) {
        result += `${b[`${i}${j}`]}`;
      }
      if(result === victoryCondition) return winner();
    }

    // check the columns
    for(let j = 0; j < boardSize; j++) {
      let result = '';
      for(let i = 0; i < boardSize; i++) {
        result += `${b[`${i}${j}`]}`;
      }
      if(result === victoryCondition) return winner();
    }
    
    // check the diagonals
    let diagonal1 = '';
    for(let i = 0; i < boardSize; i++) {
      diagonal1 += `${b[`${i}${i}`]}`;
    }
    if(diagonal1 === victoryCondition) return winner();
    let diagonal2 = '';
    for(let i = 0; i < boardSize; i++) {
      diagonal2 += `${b[`${i}${boardSize-1-i}`]}`;
    }
    if(diagonal2 === victoryCondition) return winner();

    // check for a tie
    if(board.dashes === 0) return draw();
  };

  // for switching players
  const switchPlayer = () => {
    const change = {
      'X' : 'O',
      'O' : 'X'
    };
    changePlayer(change[currentPlayer]);
  };

  // for switching the box icon
  const changeBox = (event) => {
    if(!gameOver) {
      const index = event.target.id;
      const newBoard = {...board}; // make a copy of board
      if(newBoard[index] === '-') { //use it in place of board
        newBoard[index] = currentPlayer;
        newBoard.dashes--;
        setBoard(newBoard); //when done, change board to match the newBoard
        switchPlayer();
      }
    }
  };

  /* --- USEEFFECTS --- */

  useEffect(resetBoard, []);
  useEffect(resetBoard, [boardSize]);
  useEffect(checkForWinner, [board]);

  /* --- ROW CREATION --- */

  // generate rows with unique keys that will be used to creat boxes with unique ids
  const rows = [];
  for(let i = 0; i < boardSize; i++){
    rows.push(
      <div>
        <Row 
          key={`Row${i}`} 
          index={i} 
          board={board} 
          changeBox={changeBox}
          boardSize={boardSize}
        />
      </div>
    );
  }

  /* --- CONDITIONALS --- */

  const endDiv = [];
  if(message !== '') endDiv.push(<div className='end-game'>{message} <button className='word-glow' id='reset-board' onClick={resetBoard}>Reset Board</button></div>);

  const softReset = [];
  if(!gameOver) softReset.push(<button className='soft-reset word-glow' onClick={resetBoard}>Soft Reset</button>);
  
  /* --- RETURN --- */

  return (
    <div id='game'>
      <h1>
        <button className='board-change word-glow' onClick={decreaseBoard}>
          -
        </button>
        Tic Tac Toe
        <button className='board-change word-glow' onClick={increaseBoard}>
          +
        </button>
      </h1>
      <h2>Current Player: {currentPlayer} {softReset}</h2>
      {endDiv}
      {/* Add in the rows array (with fragments! neat!)*/}
        {rows}
      <h3>SCORES</h3>
      <p>
        <span className='player-1'>
          {`Player X: ${score['X']}`}
        </span>
        <span className='player-2'>
          {`Player O: ${score['O']}`}
        </span></p>
      <button className='word-glow' id='full-reset' onClick={fullReset}>
        Full Reset
      </button>
    </div>
  );
};

export default Board;
