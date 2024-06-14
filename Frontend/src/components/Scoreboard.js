import React from "react";
import "../scss/Scoreboard.css"

export default function Scoreboard({ P1Score, P2Score }) {

  
  return (
    <div>
    <h2>Scoreboard</h2>
    <div >
        <div  id="player1">
            <h3>Player 1</h3>
            <p>Score: <span id="player1-wins">{P1Score}</span></p>
        </div>
        
        <div  id="player2">
            <h3>Player 2</h3>
            <p>Score: <span id="player2-wins">{P2Score}</span></p>
        </div>
    </div>
</div>
  );
}