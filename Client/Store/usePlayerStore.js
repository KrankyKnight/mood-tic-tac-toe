import { create } from "zustand";

export const usePlayerStore = create((set) => ({
  player1: 'X',
  player2: 'O',
  currentPlayer: 'X',
  inactivePlayer: 'O',
  playerToSymbol: { // player: symbol
    'X': 'X',
    'O': 'O'
  },
  symbolToPlayer: { // symbol: player
    'X': 'X',
    'O': 'O'
  },
  playerToPlayer: { //playerX: playerY
    'X': 'O',
    'O': 'X'
  },
  

  setPlayer1: (name) => set(() => ({
    player1: name
  })),
  setPlayer2: (name) => set(() => ({
    player2: name
  })),
  setplayerToSymbol: (player1, player2) => set(() => ({
    playerToSymbol: {
      [player1]: 'X',
      [player2]: 'O'
    }
  })),
  setsymbolToPlayer: (player1, player2) => set(() => ({
    symbolToPlayer: {
      'X': player1,
      'O': player2
    }
  })),
  setplayerToPlayer: (player1, player2) => set(() => ({
    playerToPlayer: {
      [player1]: player2,
      [player2]: player1
    }
  })),
  setPlayers: (player1 = 'X', player2 = 'O') => set((state) => {
    state.setplayerToSymbol(player1, player2);
    state.setsymbolToPlayer(player1, player2);
    state.setplayerToPlayer(player1, player2);
    return {};
  }),
  setCurrentPlayer: (newCurrentPlayer) => set(() => ({
    currentPlayer: newCurrentPlayer,
    inactivePlayer: newCurrentPlayer === 'X' ? 'O' : 'X'    
  })),
  switchActivePlayer: () => set((state) => ({
    currentPlayer: state.inactivePlayer,
    inactivePlayer: state.currentPlayer
  }))
}));