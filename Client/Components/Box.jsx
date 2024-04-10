import React from 'react';
import { useBoardStore } from '../Store/useBoardStore.js';
import { usePlayerStore } from '../Store/usePlayerStore.js';
import { useGameStore } from '../Store/useGameStore.js';

const Box = (props) => {

  const {index} = props;
  const board =  useBoardStore((state) => state.board);
  const setBoard =  useBoardStore((state) => state.setBoard);
  const gameOver = useGameStore((state) => state.gameOver);
  const currentPlayer = usePlayerStore((state) => state.currentPlayer);
  const switchActivePlayer = usePlayerStore((state) => state.switchActivePlayer);

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