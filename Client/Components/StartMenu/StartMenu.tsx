import React from "react";
import { usePlayerStore, useGameStore } from "../../Store";
import './startMenuStyles.scss';

const StartMenu = () => {

  const setPlayer1 = usePlayerStore((state) => state.setPlayer1);
  const setPlayer2 = usePlayerStore((state) => state.setPlayer2);
  const setPlayers = usePlayerStore((state) => state.setPlayers);
  const setGameReady = useGameStore((state) => state.setGameReady);

  const setupPlayers = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const player1Field = (document.getElementById('player1-name') as HTMLInputElement).value;
    const player2Field = (document.getElementById('player2-name') as HTMLInputElement).value;
    checkFieldEntries(player1Field, player2Field);
    setPlayers();
    setGameReady(true);
  };

  const checkFieldEntries = (player1Field: string, player2Field: string) => {
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
    <div className='startMenu'>
      <h1 className='title' >TIC TAC TOE</h1>
      <div className='input'>
        <input id='player1-name' className='inputField' placeholder='NAME' type='text'/>
        <div className="vs">
          <span>vs</span>   
        </div>
        <input id='player2-name' className='inputField' placeholder='NAME' type='text'/>
      </div>
      <button className='start' id="game-start-button" onClick={setupPlayers}>START</button>
    </div>
  )
}

export default StartMenu;