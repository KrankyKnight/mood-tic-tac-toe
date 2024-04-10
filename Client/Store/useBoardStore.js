import { create } from "zustand";

export const useBoardStore = create((set) => ({
  board: 0,
  boardSize: 3,

  setBoard: (newBoard) => set(() => ({ board: newBoard })),
  setBoardSize: (newBoardSize) => set(() => ({ boardSize: newBoardSize })),
  increaseBoard: () => set((state) => ({
    boardSize: state.boardSize < 7 ? state.boardSize + 1 : state.boardSize
  })),
  decreaseBoard: () => set((state) => ({
    boardSize: state.boardSize > 3 ? state.boardSize - 1 : state.boardSize
  }))
}));