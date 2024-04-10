import React, { Fragment } from "react";
import Box from '../Box';
import { useBoardStore } from "../../Store";

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