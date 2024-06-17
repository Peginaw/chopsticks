import React from "react";
import { ArenaReducer, initialState } from '../reducers/ArenaReducer';
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



export default function Arena() {
  const [state, dispatch] = useReducer(ArenaReducer, initialState);

  function calculateWinner() {
    if (state.P2Fingers.right == 0 && state.P2Fingers.left == 0) {
      // P1 wins
      dispatch(
        { type: "UPDATE_WIN", payload: true }
      )
      dispatch(
        { type: "UPDATE_P1_SCORE", payload: (state.P1Score + 1) }
      )
      console.log("PLAYER ONE WINS");
    }
    if (state.P1Fingers.right == 0 && state.P1Fingers.left == 0) {
      // P2 wins
      dispatch(
        { type: "UPDATE_WIN", payload: true }
      )
      dispatch(
        { type: "UPDATE_P2_SCORE", payload: (state.P2Score + 1) }
      )
      console.log("PLAYER TWO WINS");
    }
  }

  function printStatus() {
    console.log(`P2: ${JSON.stringify(state.P2Fingers)}`);
    console.log(`P1: ${JSON.stringify(state.P1Fingers)}`);
  }

  function attack(attacker, defender) {
    if (attacker == 0 || defender == 0) {
      console.log("That hand is out of play, can't be used or attacked.");
      return defender;
    }
    defender += attacker;
    if (defender > MAX_FINGERS) {
      defender = 0;
      console.log("Hand was knocked out");
    }
    return defender;
  }


  const HAND_IMAGES = [zero, one, two, three, four];
  //const [win, setWin] = useState(false);
  //const [P1Fingers, setP1Fingers] = useState({ "left": 1, "right": 1 });
  //const [P2Fingers, setP2Fingers] = useState({ "left": 1, "right": 1 });
  //const [P1Score, setP1Score] = useState(0);
  //const [P2Score, setP2Score] = useState(0);
  let attackedFingers = { "left": 0, "right": 0 };



  const handleAttack = (attackInfo) => {
    let turnTaken = true;

    if (state.isP1Turn) {//                  ### P1 ATTACKS ###
      switch (attackInfo) {
        case "P1-LL": // P1-L attacks P2-L
          console.log("( P1 L -> P2 L )")
          attackedFingers = state.P2Fingers;
          attackedFingers.left = attack(state.P1Fingers.left, state.P2Fingers.left);
          dispatch(
            { type: "UPDATE_P2_FINGERS_LEFT", payload: attackedFingers.left }
          )
          dispatch(
            { type: "UPDATE_TURN", payload: !state.isP1Turn } // Change turns
          )
          break;

        case "P1-LR": // P1-L attacks P2-R
          console.log("( P1 L -> P2 R )")
          attackedFingers = state.P2Fingers;
          attackedFingers.right = attack(state.P1Fingers.left, state.P2Fingers.right);
          dispatch(
            { type: "UPDATE_P2_FINGERS_RIGHT", payload: attackedFingers.right }
          )
          dispatch(
            { type: "UPDATE_TURN", payload: !state.isP1Turn } // Change turns
          )
          break;

        case "P1-RL": // P1-R attacks P2 LEFT
          console.log("( P1 R -> P2 L )")
          attackedFingers = state.P2Fingers;
          attackedFingers.left = attack(state.P1Fingers.right, state.P2Fingers.left);
          dispatch(
            { type: "UPDATE_P2_FINGERS_LEFT", payload: attackedFingers.left }
          )
          dispatch(
            { type: "UPDATE_TURN", payload: !state.isP1Turn } // Change turns
          )
          break;

        case "P1-RR": // P1-R attacks P2 right
          console.log("( P1 R -> P2 R )")
          attackedFingers = state.P2Fingers;
          attackedFingers.right = attack(state.P1Fingers.right, state.P2Fingers.right);
          dispatch(
            { type: "UPDATE_P2_FINGERS_RIGHT", payload: attackedFingers.right }
          )
          dispatch(
            { type: "UPDATE_TURN", payload: !state.isP1Turn } // Change turns
          )
          break;
        default:
          turnTaken = false;
          break;
      }
    }
    else {//                           ### P2 ATTACKS ###
      switch (attackInfo) {
        case "P2-LL": // P2-L attacks P1-L
          console.log("( P2 L -> P1 L )")
          attackedFingers = state.P1Fingers;
          attackedFingers.left = attack(state.P2Fingers.left, state.P1Fingers.left);
          dispatch(
            { type: "UPDATE_P1_FINGERS_LEFT", payload: attackedFingers.left }
          )
          dispatch(
            { type: "UPDATE_TURN", payload: !state.isP1Turn } // Change turns
          )
          break;

        case "P2-LR": // P2-L attacks P1-R
          console.log("( P2 L -> P1 R )")
          attackedFingers = state.P1Fingers;
          attackedFingers.right = attack(state.P2Fingers.left, state.P1Fingers.right);
          dispatch(
            { type: "UPDATE_P1_FINGERS_RIGHT", payload: attackedFingers.right }
          )
          dispatch(
            { type: "UPDATE_TURN", payload: !state.isP1Turn } // Change turns
          )
          break;

        case "P2-RL": // P2-R attacks P1-L
          console.log("( P2 R -> P1 L )")
          attackedFingers = state.P1Fingers;
          attackedFingers.left = attack(state.P2Fingers.right, state.P1Fingers.left);
          dispatch(
            { type: "UPDATE_P1_FINGERS_LEFT", payload: attackedFingers.left }
          )
          dispatch(
            { type: "UPDATE_TURN", payload: !state.isP1Turn } // Change turns
          )
          break;

        case "P2-RR": // P2-R attacks P1-R
          console.log("( P2 R -> P1 R )")
          attackedFingers = state.P1Fingers;
          attackedFingers.right = attack(state.P2Fingers.right, state.P1Fingers.right);
          dispatch(
            { type: "UPDATE_P1_FINGERS_RIGHT", payload: attackedFingers.right }
          )
          dispatch(
            { type: "UPDATE_TURN", payload: !state.isP1Turn } // Change turns
          )
          break;
        default:
          turnTaken = false;
          break;
      }

    }
    if (turnTaken){
      printStatus();
      calculateWinner();
    }
  }
  return (
    <>
      <div>
        <Scoreboard P1score={state.P1Score} P2score={state.P2Score} isP1Turn={state.isP1Turn} />
      </div>
      <div className="player playerTwo">
        {!state.win && <img src={HAND_IMAGES[state.P2Fingers.left]} />}
        {!state.win && <img className="flipHand" src={HAND_IMAGES[state.P2Fingers.right]} />}
      </div>

      <div className="player playerOne">
        {!state.win && <img src={HAND_IMAGES[state.P1Fingers.left]} />}
        {!state.win && <img className="flipHand" src={HAND_IMAGES[state.P1Fingers.right]} />}
      </div>

      {state.win && <h1>WINNER WINNER CHICKEN DINNER</h1>}

      <PlayerTwo onAttack={handleAttack} isP1Turn={state.isP1Turn} />
      <PlayerOne onAttack={handleAttack} isP1Turn={state.isP1Turn} />
    </>
  )
}