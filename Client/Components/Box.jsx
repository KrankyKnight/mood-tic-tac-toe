import React from 'react';
import { useStore } from '../Store/useStore';

const Box = (props) => {

  const {index} = props;

  const { 
    board, 
    gameOver, 
    currentPlayer,
    setBoard,
    switchActivePlayer
  } = useStore((state) => state);

  const changeBox = (event) => {
    if(!gameOver) {
      const index = event.target.id;
      const newBoard = {...board};
      if(newBoard[index] === '-') {
        newBoard[index] = currentPlayer;
        newBoard.dashes--;
        setBoard(newBoard);
        switchActivePlayer();
      };
    };
  };

  return (
    <button className='tic-box' id={index} onClick={changeBox}> 
      {board[index]} 
    </button>
  );
};

export default Box;