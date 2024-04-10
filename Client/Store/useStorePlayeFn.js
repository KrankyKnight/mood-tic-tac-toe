import { useStore } from "./useStore";

useStore.checkFieldEntries = (player1Field, player2Field) => {
  let player1 = player1Field.replace(/\s*/, '').length ? player1Field : 'X';
  let player2 = player2Field.replace(/\s*/, '').length ? player2Field : 'O';
  if(player1Field.replace(/\s*/, '') === 'X') player1 = 'Joker';
  if(player2Field.replace(/\s*/, '') === 'O') player2 = 'Riddler';
  if(player1Field.replace(/\s*/, '') === player2Field.replace(/\s*/, '') && player1Field.replace(/\s*/, '').length) {
    player1 = 'Max Carver';
    player2 = 'Charlie Carver';
  };
  return {
    player1: player1,
    player2: player2
  };
};

useStore.setupPlayers = (event) => set((state) => {
  event.preventDefault();
  const player1Field = document.getElementById('player1-name').value;
  const player2Field = document.getElementById('player2-name').value;
  const {player1, player2} = state.checkFieldEntries(player1Field, player2Field);
  state.setPlayers(player1, player2);
  state.setScore({
    [player1]: 0,
    [player2]: 0
  });
  state.setGameReady(true);
  return {};
});