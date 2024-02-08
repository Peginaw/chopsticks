import React from "react";
import { useState } from "react";
import PlayerOneRightHand from "./P1-RightHand";

const maxFingers = 4;

export default function Arena(isP1Turn){

  const [P1Fingers, setP1Fingers] = useState({left: 0, right: 0});
  const [P2Fingers, setP2Fingers] = useState({left: 0, right: 0});
  let attackedFingers = {left: 0, right: 0};

  const handleAttack = (attackInfo) =>{
    console.log(attackInfo);
    switch (attackInfo){
      case "P1-LL": // P1-L attacks P2-L
        attackedFingers = P2Fingers;
        attackedFingers[left] += P1Fingers[left];
        setP2Fingers(attackedFingers);
        break;
      case "P1-LR": // P1-L attacks P2-R
        attackedFingers = P2Fingers;
        attackedFingers[right] += P1Fingers[left];
        setP2Fingers(attackedFingers);
        break;
      case "P1-RL": // P1-R attacks
        attackedFingers = P1Fingers;
        attackedFingers[left] += P1Fingers[right];
        setP2Fingers(attackedFingers);
        break;
      case "P1-RR":
        attackedFingers = P1Fingers;
        attackedFingers[right] += P1Fingers[right];
        setP2Fingers(attackedFingers);
        break;
      case "P2-LL": // P1-L attacks P2-L
        attackedFingers = P2Fingers;
        attackedFingers[left] += P2Fingers[left];
        setP1Fingers(attackedFingers);
        break;
      case "P2-LR": // P1-L attacks P2-R
        attackedFingers = P2Fingers;
        attackedFingers[right] += P2Fingers[left];
        setP1Fingers(attackedFingers);
        break;
      case "P2-RL": // P1-R attacks
        attackedFingers = P1Fingers;
        attackedFingers[left] += P2Fingers[right];
        setP1Fingers(attackedFingers);
        break;
      case "P2-RR":
        attackedFingers = P1Fingers;
        attackedFingers[right] += P2Fingers[right];
        setP1Fingers(attackedFingers);
        break;
    }

  }
  return (
    <>
      <PlayerOneRightHand onAttack={handleAttack} />
    </>
  )
  }

function calculateWinner(P1Fingers, P2Fingers){
  if(P2Fingers[0] > maxFingers && P2Fingers[1] > maxFingers){
    // P1 wins
  }
  if(P1Fingers[0] > maxFingers && P1Fingers[1] > maxFingers){
    // P2 wins
  }
}


