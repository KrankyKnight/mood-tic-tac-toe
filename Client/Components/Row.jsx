import React, { Fragment } from "react";
import Box from './Box.jsx';

const Row = (props) => {
  
  // destructuring the props
  const {board, changeBox, index, boardSize} = props;

  // create boxes with unique ids 
  const boxes = [];
  for(let i = 0; i < boardSize; i++){
    boxes.push(
      <Box 
        key={`Row${index}Box${i}`} 
        index={`${index}${i}`} 
        board={board} 
        changeBox={changeBox}
      />);
  }

  return (
    <Fragment key={`box-fr${index}`}>
      {boxes}
    </Fragment>
  );
};

export default Row;