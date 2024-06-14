import React from "react";
import {ArenaReducer, initialState }from '../reducers/ArenaReducer';
import { useState, useReducer } from "react";
import PlayerOne from "./PlayerOne";
import PlayerTwo from "./PlayerTwo";
import Scoreboard from './Scoreboard'
import zero from './0.png';
import one from './1.png';
import two from './2.png';
import three from './3.png';
import four from './4.png';

const MAX_FINGERS = 4;



export default function Arena  (isP1Turn){
  
function calculateWinner(){
    if(P2Fingers.right == 0 && P2Fingers.left == 0){
      // P1 wins
      setWin(true);
      setP1Score(P1Score += 1);
      console.log("PLAYER ONE WINS");
    }
    if(P1Fingers.right == 0 && P1Fingers.left == 0){
      // P2 wins
      setWin(true);
      setP2Score(P2Score += 1);
      console.log("PLAYER TWO WINS");
    }
  }
  
  function printStatus() {
    console.log(`P2: ${JSON.stringify(P2Fingers)}`);
    console.log(`P1: ${JSON.stringify(P1Fingers)}`);
  }
  
   function attack(attacker, defender) {
    if (attacker == 0 || defender == 0){
      console.log("That hand is out of play, can't be used or attacked.");
      return defender;
    }
    defender += attacker;
    if (defender > MAX_FINGERS){
      defender = 0;
      console.log("Hand was knocked out");
    }
    return defender;
  }
  
  const [state, dispatch] = useReducer(ArenaReducer, initialState);

  const HAND_IMAGES =[zero, one, two, three, four];
  const [win, setWin] = useState(false);
  const [P1Fingers, setP1Fingers] = useState({"left": 1, "right": 1});
  const [P2Fingers, setP2Fingers] = useState({"left": 1, "right": 1});
  const [P1Score, setP1Score] = useState(0);
  const [P2Score, setP2Score] = useState(0);
  let attackedFingers = {"left": 0, "right": 0};
  
  

  const handleAttack = (attackInfo) =>{
    switch (attackInfo){
      case "P1-LL": // P1-L attacks P2-L
        attackedFingers = state.P2Fingers;
       
        attackedFingers.left = attack(state.P1Fingers.left, state.P2Fingers.left);
        
        dispatch(
          {type: "UPDATE_P2_FINGERS_LEFT", payload: attackedFingers.left}
        )
        
        break;
      case "P1-LR": // P1-L attacks P2-R
        attackedFingers = P2Fingers;
        attackedFingers.right = attack(state.P1Fingers.left, state.P2Fingers.right);
        dispatch(
          {type: "UPDATE_P2_FINGERS_RIGHT", payload: attackedFingers.right}
        )
        break;
      case "P1-RL": // P1-R attacks P2 LEFT
        attackedFingers = P2Fingers;
        attackedFingers.left = attack(state.P1Fingers.right, state.P2Fingers.left);
        dispatch(
          {type: "UPDATE_P2_FINGERS_LEFT", payload: attackedFingers.left}
        )
        break;
      case "P1-RR": // P1-R attacks P2 right
        attackedFingers = P2Fingers;
        attackedFingers.right = attack(state.P1Fingers.right, state.P2Fingers.right);
        dispatch(
          {type: "UPDATE_P2_FINGERS_RIGHT", payload: attackedFingers.left}
        )        
        break;
      case "P2-LL": // P1-L attacks P2-L
        attackedFingers = P1Fingers;
        attackedFingers.left = attack(P2Fingers.left, P1Fingers.left);
        setP1Fingers({...attackedFingers});
        break;
      case "P2-LR": // P1-L attacks P2-R
        attackedFingers = P1Fingers;
        attackedFingers.right = attack(P2Fingers.left, P1Fingers.right);
        setP1Fingers({...attackedFingers});
        break;
      case "P2-RL": // P1-R attacks
        attackedFingers = P1Fingers;
        attackedFingers.left = attack(P2Fingers.right, P1Fingers.left);
        setP1Fingers({...attackedFingers});
        break;
      case "P2-RR":
        attackedFingers = P1Fingers;
        attackedFingers.right = attack(P2Fingers.right, P1Fingers.right);
        setP1Fingers({...attackedFingers});
        break;
    }


    printStatus();
    calculateWinner();

  }
  return (
    <>
      <div>
        <Scoreboard  P1score={P1Score} P2score={P2Score} />
      </div>
      <div className="player playerTwo">
        {!win && <img src={ HAND_IMAGES[state.P2Fingers.left] } />}
        {console.log("yo mf", state.P2Fingers)}
        {!win && <img className="flipHand" src={ HAND_IMAGES[P2Fingers.right]} />}
      </div>
        
      <div className="player">
        {!win && <img src={ HAND_IMAGES[P1Fingers.left] } />}
        {!win && <img className="flipHand" src={ HAND_IMAGES[P1Fingers.right] } />}
      </div>

      {win && <h1>WINNER WINNER CHICKEN DINNER</h1>}
      
      <PlayerTwo onAttack={handleAttack} />
      <PlayerOne onAttack={handleAttack} />
    </>
  )
}