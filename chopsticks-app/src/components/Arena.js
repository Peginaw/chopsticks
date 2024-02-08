import React from "react";
import { useState } from "react";
import PlayerOne from "./PlayerOne";
import PlayerTwo from "./PlayerTwo";
import zero from './0.png';
import one from './1 1.png';
import two from './2 1.png';
import three from './3.png';
import four from './4.png';

const MAX_FINGERS = 4;

const HAND_IMAGES = [zero, one, two, three, four]


export default function Arena(isP1Turn){
  
  function calculateWinner(){
    if(P2Fingers.right == 0 && P2Fingers.left == 0){
      // P1 wins
      setWin(true);
      console.log("PLAYER ONE WINS");
    }
    if(P1Fingers.right == 0 && P1Fingers.left == 0){
      // P2 wins
      setWin(true);
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

  const [win, setWin] = useState(false);
  const [P1Fingers, setP1Fingers] = useState({"left": 1, "right": 1});
  const [P2Fingers, setP2Fingers] = useState({"left": 1, "right": 1});
  let attackedFingers = {"left": 0, "right": 0};
  

  const handleAttack = (attackInfo) =>{
    console.log(attackInfo);
    switch (attackInfo){
      case "P1-LL": // P1-L attacks P2-L
        attackedFingers = P2Fingers;
        attackedFingers.left = attack(P1Fingers.left, P2Fingers.left);
        setP2Fingers(attackedFingers);
        break;
      case "P1-LR": // P1-L attacks P2-R
        attackedFingers = P2Fingers;
        attackedFingers.right = attack(P1Fingers.left, P2Fingers.right);
        setP2Fingers(attackedFingers);
        break;
      case "P1-RL": // P1-R attacks
        attackedFingers = P2Fingers;
        attackedFingers.left = attack(P1Fingers.right, P2Fingers.left);
        setP2Fingers(attackedFingers);
        break;
      case "P1-RR":
        attackedFingers = P2Fingers;
        attackedFingers.right = attack(P1Fingers.right, P2Fingers.right);
        setP2Fingers(attackedFingers);
        break;
      case "P2-LL": // P1-L attacks P2-L
        attackedFingers = P1Fingers;
        attackedFingers.left = attack(P2Fingers.left, P1Fingers.left);
        setP1Fingers(attackedFingers);
        break;
      case "P2-LR": // P1-L attacks P2-R
        attackedFingers = P1Fingers;
        attackedFingers.right = attack(P2Fingers.left, P1Fingers.right);
        setP1Fingers(attackedFingers);
        break;
      case "P2-RL": // P1-R attacks
        attackedFingers = P1Fingers;
        attackedFingers.left = attack(P2Fingers.right, P1Fingers.left);
        setP1Fingers(attackedFingers);
        break;
      case "P2-RR":
        attackedFingers = P1Fingers;
        attackedFingers.right = attack(P2Fingers.right, P1Fingers.right);
        setP1Fingers(attackedFingers);
        break;
    }


    printStatus();
    calculateWinner();

  }
  return (
    <>
      <div className="player playerTwo">
        {!win && <img src={ HAND_IMAGES[P2Fingers.left] } />}
        {!win && <img className="flipHand" src={ HAND_IMAGES[P2Fingers.right] } />}
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