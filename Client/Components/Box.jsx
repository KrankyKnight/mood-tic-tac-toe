import React from 'react';

const Box = (props) => {

  // final destructure of drilled props
  const {board, index, changeBox} = props;

  // each box references its location in a state grid based in it's unique id
  return (
    <button className='tic-box' id={index} onClick={changeBox}> 
      {board[index]} 
    </button>
  );
};

export default Box;