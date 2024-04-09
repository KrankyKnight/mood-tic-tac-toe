import { create } from "zustand";
import { useGameStore } from "./gameStore";
const setGameOver = useGameStore((state) => state.setGameOver);
const setMessage = useGameStore((state) => state.setMessage);
const setCurrentPlayer = useGameStore((state) => state.setCurrentPlayer);
const setScore = useGameStore((state) => state.setScore);

export const useBoardStore = create((set) => ({
  board: 0,
  boardSize: 3,
  setBoard: (newBoard) => set(() => ({ board: newBoard })),
  setBoardSize: (newBoardSize) => set(() => ({ boardSize: newBoardSize }))
}));

useBoardStore.softReset = () => {
  const newBoard = {};
  for(let i = 0; i < boardSize; i++){
    for(let j = 0; j < boardSize; j++){
      newBoard[`${i}${j}`] = '-';
    }
  };
  newBoard.dashes = Math.pow(boardSize, 2);
  setBoard(newBoard)
  setGameOver(false);
  setMessage('');
  setCurrentPlayer('X');
};

useBoardStore.fullReset = () => {
  softReset();
  setScore({'X': 0, 'O': 0});
};

useBoardStore.increaseBoard = () => {
  if(boardSize < 7) setBoardSize(boardSize + 1);
};

useBoardStore.decreaseBoard = () => {
  if(boardSize > 3) setBoardSize(boardSize - 1);
};

