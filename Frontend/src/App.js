
import './App.css';
import { useState } from 'react';

import Arena from './components/Arena';


const recentMatches = [{id: 1, outcome: "Win"},
                {id: 2, outcome: "Loss"},
                {id: 3, outcome: "Win"},
                {id: 4, outcome: "Win"},
                {id: 5, outcome: "Loss"}
                ]


function App() {
  return (
    <div className="App">
      <header className="App-header">
       <Arena />
       
        
      </header>
    </div>
  );
}

export default App;