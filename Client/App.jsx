/**
 * @description The top level React component that render the application and provides a background
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import Board from './Board.jsx';


const App = () => {
  return (
    <div>
      <Board>
        Mood Tic Tac Toe
      </Board>
      {/* The below is a reference to a lofi youtube video that will be displayed as the background */}
      <div className='video-container'>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/To-UiKVdGPU?si=xuWPSoH82ONZluUD&amp;controls=0&autoplay=1&playsinline=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>
    </div>
  );
};

const root = createRoot(document.querySelector('#root'));
root.render(<App />);