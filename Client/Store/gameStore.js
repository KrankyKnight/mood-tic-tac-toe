import { create } from "zustand";
import { useBoardStore } from "./boardStore";
const board = useBoardStore((state) => state.board);
const boardSize = useBoardStore((state) => state.board);

export const useGameStore = create((set) => ({
  currentPlayer: '',
  playerReference: {},
  gameReady: false,
  gameOver: false,
  message: '',
  score: {},

  setCurrentPlayer: (newCurrentPlayer) => set(() => ({ currentPlayer: newCurrentPlayer})),
  setGameOver: (newGameStatus) => set(() => ({ gameOver: newGameStatus})),
  setGameReady: (readyState) => set(() => ({ gameReady: readyState })),
  setMessage: (newMessage) => set(() => ({ message: newMessage})),
  setScore: (newScore) => set(() => ({ score: newScore})),
  setPlayerReference: (player1, player2) => set(() => ({
    player1: player2,
    player2: player1
  })),

  setUpPlayers: (player1 = 'X', player2 = 'O') => {
    setCurrentPlayer(player1);
    setPlayerReference(player1, player2);
    setScore({
      player1: 0,
      player2: 0
    });
    setGameReady(true);
  },
  
  winner: () => {
    const newScore = {...score};
    const inactivePlayer = playerReference[currentPlayer];
    newScore[inactivePlayer]++;
    setGameOver(true);
    setMessage(`Player ${inactivePlayer} wins!!!`);
    setScore(newScore);
  },
  
  draw: () => {
    setGameOver(true);
    setMessage('It\'s a Draw!!!');
  },
  
  checkForWinner: () => {
    const newBoard = {...board};
    const inactivePlayer = playerReference[currentPlayer];
    let victoryCondition = ``;
  
    for(let counter = 0; counter < boardSize; counter++) {
      victoryCondition += `${iP}`;
    };
  
    for(let row = 0; row < boardSize; row++) {
      let result = '';
      for(let column = 0; column < boardSize; column++) {
        result += `${newBoard[`${row}${column}`]}`
      };
      if(result === victoryCondition) return winner();
    };

    for(let column = 0; column < boardSize; column++) {
      let result = '';
      for(let row = 0; row < boardSize; row++) {
        result += `${newBoard[`${row}${column}`]}`;
      }
      if(result === victoryCondition) return winner();
    };

    let diagonal1 = '';
    for(let row = 0; row < boardSize; row++) {
      diagonal1 += `${newBoard[`${row}${row}`]}`;
    }
    if(diagonal1 === victoryCondition) return winner();

    let diagonal2 = '';
    for(let row = 0; row < boardSize; row++) {
      diagonal2 += `${newBoard[`${row}${boardSize-1-row}`]}`;
    }
    if(diagonal2 === victoryCondition) return winner();

    if(newBoard.dashes === 0) return draw();
  },

  switchPlayer: () => {
    setCurrentPlayer(playerReference[currentPlayer]);
  }

}))


