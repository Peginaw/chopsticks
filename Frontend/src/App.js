
import './App.css';
import PlayerDashboard from "./components/PlayerDashboard"
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
       <PlayerDashboard wins = {21} losses={12} recentMatches={recentMatches}/>
       
        
      </header>
    </div>
  );
}

export default App;