import { create } from "zustand";

export const useGameStore = create((set) => ({
  gameReady: false,
  gameOver: false,
  message: '',
  score: {},

  setGameOver: (newGameStatus) => set(() => ({ gameOver: newGameStatus})),
  setGameReady: (readyState) => set(() => ({ gameReady: readyState })),
  setMessage: (newMessage) => set(() => ({ message: newMessage})),
  setScore: (newScore) => set(() => ({ score: newScore}))
}));