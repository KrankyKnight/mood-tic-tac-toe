import React from "react";
import { usePlayerStore, useGameStore } from "../../Store";

const StartMenu = () => {

  const setPlayer1 = usePlayerStore((state) => state.setPlayer1);
  const setPlayer2 = usePlayerStore((state) => state.setPlayer2);
  const setPlayers = usePlayerStore((state) => state.setPlayers);
  const setGameReady = useGameStore((state) => state.setGameReady);

  const setupPlayers = (event) => {
    event.preventDefault();
    const player1Field = document.getElementById('player1-name').value;
    const player2Field = document.getElementById('player2-name').value;
    checkFieldEntries(player1Field, player2Field);
    setPlayers();
    setGameReady(true);
  };

  const checkFieldEntries = (player1Field, player2Field) => {
    let tempPlayer1 = player1Field.replace(/\s*/, '').length ? player1Field : 'X';
    let tempPlayer2 = player2Field.replace(/\s*/, '').length ? player2Field : 'O';
    if(player1Field.replace(/\s*/, '') === 'X') tempPlayer1 = 'Joker';
    if(player2Field.replace(/\s*/, '') === 'O') tempPlayer2 = 'Riddler';
    if(player1Field.replace(/\s*/, '') === player2Field.replace(/\s*/, '') && player1Field.replace(/\s*/, '').length) {
      tempPlayer1 = 'Max Carver';
      tempPlayer2 = 'Charlie Carver';
    };
    setPlayer1(tempPlayer1);
    setPlayer2(tempPlayer2);
  };

  return (
    <div>
      <input id='player1-name' type='text'/>
      <input id='player2-name' type='text'/>
      <button id="game-start-button" onClick={setupPlayers}>Start</button>
    </div>
  )
}

export default StartMenu;