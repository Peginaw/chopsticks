import React from "react";

export default function Scoreboard({ scores }) {
    const [P1Score, P2Score] = scores;

  
  return (
    <div>
    <h2>Scoreboard</h2>
    
    <div >
        <div  id="player1">
            <h3>Player 1</h3>
            <p>Score: <span id="player1-wins">5</span></p>
           
        </div>
        
        <div  id="player2">
            <h3>Player 2</h3>
            <p>Score: <span id="player2-wins">6</span></p>
        </div>
    </div>
</div>
  );
}