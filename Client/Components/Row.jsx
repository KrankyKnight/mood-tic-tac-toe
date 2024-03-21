const Row = (props) => {
  
  // destructuring the props
  const {board, changeBox, index, boardSize} = props;

  // create boxes with unique ids 
  const boxes = [];
  for(let i = 0; i < boardSize; i++){
    boxes.push(
      <Box 
        key={`${index}${i}`} 
        index={`${index}${i}`} 
        board={board} 
        changeBox={changeBox}
      />);
  }

  return (
    <>
      {boxes}
    </>
  );
};

export default Row;