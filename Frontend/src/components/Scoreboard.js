import React from "react";
import "../scss/Scoreboard.css"; // Ensure the correct path to your CSS file

export default function Scoreboard({ P1Score, P2Score, isP1Turn }) {
  return (
    <div className="container poppins-light">
      <h2>SCOREBOARD</h2>
      <div className="player-container">
        <div id="player1">
          <h3>Player 1</h3>
          <p>Score: <span id="player1-wins">{P1Score}</span></p>
        </div>
        <div id="player2">
          <h3>Player 2</h3>
          <p>Score: <span id="player2-wins">{P2Score}</span></p>
        </div>
      </div>
      <div className="is_turn">
        {isP1Turn ? <p>Turn: <span id="turn-indicator">P1</span></p> : <p>Turn: <span id="turn-indicator">P2</span></p>}
      </div>
    </div>
  );
}
