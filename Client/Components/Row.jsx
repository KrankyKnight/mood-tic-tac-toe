import React, { Fragment } from "react";
import Box from './Box.jsx';
import { useStore } from "../Store/useStore.js";

const Row = (props) => {
  
  const boardSize = useStore((state) => state.boardSize);
  const {index} = props;

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