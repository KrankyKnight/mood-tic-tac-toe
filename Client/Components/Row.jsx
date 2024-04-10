import React, { Fragment } from "react";
import Box from './Box.jsx';
import { useBoardStore } from "../Store/useBoardStore.js";

const Row = (props) => {
  
  const {index} = props;
  const boardSize = useBoardStore((state) => state.boardSize);

  const boxes = [];

  for(let i = 0; i < boardSize; i++){
    boxes.push(
      <Box 
        key={`Row${index}Box${i}`} 
        index={`${index}${i}`} 
      />);
  };

  return (
    <Fragment key={`box-fr${index}`}>
      {boxes}
    </Fragment>
  );
};

export default Row;