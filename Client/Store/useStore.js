import { create } from "zustand";

export const useStore = create((set) => ({
  board: 0,
  boardSize: 3,
  players: {
    playerValue: {
      'X': 'X',
      'O': 'O'
    },
    valueRef: {
      'X': 'X',
      'O': 'O'
    },
    inverseRef: {
      'X': 'O',
      'O': 'X'
    }
  },
  currentPlayer: 'X',
  inactivePlayer: 'O',
  gameReady: false,
  gameOver: false,
  message: '',
  score: {},

  setBoard: (newBoard) => set(() => ({ board: newBoard })),
  setBoardSize: (newBoardSize) => set(() => ({ boardSize: newBoardSize })),
  setPlayers: (player1 = 'X', player2 = 'O') => set(() => ({
    players: {
      playerValue: {
        [player1]: 'X',
        [player2]: 'O'
      },
      valueRef: {
        'X': player1,
        'O': player2
      },
      inverseRef: {
        [player1]: player2,
        [player2]: player1
      }
    }
  })),
  setCurrentPlayer: (newCurrentPlayer) => set((state) => {
    return {
      currentPlayer: newCurrentPlayer,
      inactivePlayer: newCurrentPlayer === 'X' ? 'O' : 'X'
    };
  }),
  setGameOver: (newGameStatus) => set(() => ({ gameOver: newGameStatus})),
  setGameReady: (readyState) => set(() => ({ gameReady: readyState })),
  setMessage: (newMessage) => set(() => ({ message: newMessage})),
  setScore: (newScore) => set(() => ({ score: newScore})),
  switchActivePlayer: () => set((state) => ({
    currentPlayer: state.inactivePlayer,
    inactivePlayer: state.currentPlayer
  })),
}));