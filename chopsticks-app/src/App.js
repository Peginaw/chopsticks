
import './App.css';
import { useState } from 'react';

import PlayerOneLeftHand from './components/P1-LeftHand';
import PlayerOneRghtHand from './components/P1-RightHand';
import Arena from './components/Arena';



function App() {
  



  return (
    <div className="App">
      <header className="App-header">
       <Arena />
       
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
