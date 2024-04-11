/**
 * @description The top level React component that render the application and provides a background
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import Board from './Components/Board';
import './appStyles.scss';


const App = (): JSX.Element => {
  return (
    <div>
      <Board key="game-board">
        Mood Tic Tac Toe
      </Board>
      {/* The below is a reference to a lofi youtube video that will be displayed as the background */}
    </div>
  );
};

const root = createRoot(document.querySelector('#root'));
root.render(<App key="application"/>);