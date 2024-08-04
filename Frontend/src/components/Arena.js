import React, { useEffect } from "react";
import { Button } from "react";
import { ArenaReducer } from '../reducers/ArenaReducer';
import { useState, useReducer, useRef } from "react";
import PlayerOne from "./PlayerOne";
import PlayerTwo from "./PlayerTwo";
import Scoreboard from './Scoreboard'
import zero from './0.png';
import one from './1.png';
import two from './2.png';
import three from './3.png';
import four from './4.png';

const MAX_FINGERS = 4;

export const initialState = {
  win: false,
  isP1Turn: true,
  P1Fingers: { left: 1, right: 1 },
  P2Fingers: { left: 1, right: 1 },
  P1Score: 0,
  P2Score: 0,
};

export default function Arena() {
  const [state, dispatch] = useReducer(ArenaReducer, initialState);
  const [message, setMessage] = useState("");
  const socket=useRef(null)

  useEffect(() => {
    if (!socket.current || socket.current.readyState === WebSocket.CLOSED) {
      socket.current = new WebSocket('ws://10.0.0.186:3001');
    }
    
    // socket.current.onmessage = (event) => {
    //   setMessages((prevMessages) => [...prevMessages, event.data]);
    // };
    
    return () => {
      socket.current.close();
    };
  }, []);


  function socketTestHandler(event) {
    setMessage(event.target.value)
  }

  const sendMessage = () => {
    if (socket.current && socket.current.readyState === WebSocket.OPEN) {
      socket.current.send(message);
      setMessage('');
    }
  };

  useEffect(() => {console.log(initialState)}, [initialState])

  useEffect(() => { // whenever a turn is taken, print status and check for winner
    printStatus(); 
    calculateWinner()
  }, [state.P1Fingers, state.P2Fingers])

  function calculateWinner() {
    if (state.P2Fingers.right == 0 && state.P2Fingers.left == 0) {
      // P1 wins
      dispatch(
        { type: "UPDATE_WIN", payload: true }
      )
      dispatch(
        { type: "UPDATE_P1_SCORE", payload: (state.P1Score + 1) }
      )
      console.log("PLAYER ONE WINS!");
    }
    if (state.P1Fingers.right == 0 && state.P1Fingers.left == 0) {
      // P2 wins
      dispatch(
        { type: "UPDATE_WIN", payload: true }
      )
      dispatch(
        { type: "UPDATE_P2_SCORE", payload: (state.P2Score + 1) }
      )
      console.log("PLAYER TWO WINS!");
    }
  }

  function printStatus() {
    console.log(`P2: ${JSON.stringify(state.P2Fingers)}`);
    console.log(`P1: ${JSON.stringify(state.P1Fingers)}`);
  }

  function attack(type, attacker, defender) {
    if (attacker == 0 || defender == 0) {
      console.log("That hand is out of play, can't be used or attacked.");
      return;
    }
    console.log(defender)
    defender += attacker;
    console.log(defender)
    if (defender > MAX_FINGERS) {
      defender = 0;
      console.log("Hand was knocked out");
    }
    dispatch(
      { type: type, payload: defender }
    )
    dispatch(
      { type: "UPDATE_TURN", payload: !state.isP1Turn } // Change turns
    )
  }


  const HAND_IMAGES = [zero, one, two, three, four];
  //const [win, setWin] = useState(false);
  //const [P1Fingers, setP1Fingers] = useState({ "left": 1, "right": 1 });
  //const [P2Fingers, setP2Fingers] = useState({ "left": 1, "right": 1 });
  //const [P1Score, setP1Score] = useState(0);
  //const [P2Score, setP2Score] = useState(0);
  let attackedFingers = { "left": 0, "right": 0 };



  
  const handleAttack = (attackInfo) => {

    if (state.isP1Turn) {//                  ### P1 ATTACKS ###
      switch (attackInfo) {
        case "P1-LL": // P1-L attacks P2-L
          console.log("( P1 L -> P2 L )")
          attackedFingers = {...state.P2Fingers};
          attack("UPDATE_P2_FINGERS_LEFT", state.P1Fingers.left, state.P2Fingers.left);
          // dispatch(
          //   { type: "UPDATE_P2_FINGERS_LEFT", payload: attackedFingers.left }
          // )
          // dispatch(
          //   { type: "UPDATE_TURN", payload: !state.isP1Turn } // Change turns
          // )
          break;

        case "P1-LR": // P1-L attacks P2-R
          console.log("( P1 L -> P2 R )")
          attackedFingers = {...state.P2Fingers};
          attack("UPDATE_P2_FINGERS_RIGHT", state.P1Fingers.left, state.P2Fingers.right);
          // dispatch(
          //   { type: "UPDATE_P2_FINGERS_RIGHT", payload: attackedFingers.right }
          // )
          // dispatch(
          //   { type: "UPDATE_TURN", payload: !state.isP1Turn } // Change turns
          // )
          break;

        case "P1-RL": // P1-R attacks P2 LEFT
          console.log("( P1 R -> P2 L )")
          attackedFingers = state.P2Fingers;
          attack("UPDATE_P2_FINGERS_LEFT", state.P1Fingers.right, state.P2Fingers.left);
          // dispatch(
          //   { type: "UPDATE_P2_FINGERS_LEFT", payload: attackedFingers.left }
          // )
          // dispatch(
          //   { type: "UPDATE_TURN", payload: !state.isP1Turn } // Change turns
          // )
          break;

        case "P1-RR": // P1-R attacks P2 right
          console.log("( P1 R -> P2 R )")
          attackedFingers = {...state.P2Fingers};
          attack("UPDATE_P2_FINGERS_RIGHT", state.P1Fingers.right, state.P2Fingers.right);
          // dispatch(
          //   { type: "UPDATE_P2_FINGERS_RIGHT", payload: attackedFingers.right }
          // )
          // dispatch(
          //   { type: "UPDATE_TURN", payload: !state.isP1Turn } // Change turns
          // )
          break;
        default:
          break;
      }
    }
    else {//                           ### P2 ATTACKS ###
      switch (attackInfo) {
        case "P2-LL": // P2-L attacks P1-L
          console.log("( P2 L -> P1 L )")
          attackedFingers = {...state.P1Fingers};
          attack("UPDATE_P1_FINGERS_LEFT", state.P2Fingers.left, state.P1Fingers.left);
          // dispatch(
          //   { type: "UPDATE_P1_FINGERS_LEFT", payload: attackedFingers.left }
          // )
          // dispatch(
          //   { type: "UPDATE_TURN", payload: !state.isP1Turn } // Change turns
          // )
          break;

        case "P2-LR": // P2-L attacks P1-R
          console.log("( P2 L -> P1 R )")
          attackedFingers = {...state.P1Fingers};
          attack("UPDATE_P1_FINGERS_RIGHT", state.P2Fingers.left, state.P1Fingers.right);
          // dispatch(
          //   { type: "UPDATE_P1_FINGERS_RIGHT", payload: attackedFingers.right }
          // )
          // dispatch(
          //   { type: "UPDATE_TURN", payload: !state.isP1Turn } // Change turns
          // )
          break;

        case "P2-RL": // P2-R attacks P1-L
          console.log("( P2 R -> P1 L )")
          attackedFingers = {...state.P1Fingers};
          attack("UPDATE_P1_FINGERS_LEFT", state.P2Fingers.right, state.P1Fingers.left);
          // dispatch(
          //   { type: "UPDATE_P1_FINGERS_LEFT", payload: attackedFingers.left }
          // )
          // dispatch(
          //   { type: "UPDATE_TURN", payload: !state.isP1Turn } // Change turns
          // )
          break;

        case "P2-RR": // P2-R attacks P1-R
          console.log("( P2 R -> P1 R )")
          attackedFingers = {...state.P1Fingers};
          attack("UPDATE_P1_FINGERS_RIGHT", state.P2Fingers.right, state.P1Fingers.right);
          // dispatch(
          //   { type: "UPDATE_P1_FINGERS_RIGHT", payload: attackedFingers.right }
          // )
          // dispatch(
          //   { type: "UPDATE_TURN", payload: !state.isP1Turn } // Change turns
          // )
          break;
      }

    }
  }
  return (
    <>
      <div>
        <Scoreboard P1Score={state.P1Score} P2Score={state.P2Score} isP1Turn={state.isP1Turn} />
      </div>
      <div className="player playerTwo">
        {!state.win && <img src={HAND_IMAGES[state.P2Fingers.left]} />}
        {!state.win && <img className="flipHand" src={HAND_IMAGES[state.P2Fingers.right]} />}
      </div>

      <div className="player playerOne">
        {!state.win && <img src={HAND_IMAGES[state.P1Fingers.left]} />}
        {!state.win && <img className="flipHand" src={HAND_IMAGES[state.P1Fingers.right]} />}
      </div>

      {state.win && <h1>{state.isP1Turn} WINNER WINNER CHICKEN DINNER</h1>}
      {state.win && <button id="resetRoundButton"
        onClick={() => dispatch({ type: "NEW_ROUND_RESET" })}
        title="RESET"
        color="#841584"
      >RESET</button>}

      <PlayerTwo onAttack={handleAttack} isP1Turn={state.isP1Turn} />
      <PlayerOne onAttack={handleAttack} isP1Turn={state.isP1Turn} />
      <br/>
      <input type="text" value={message} onChange={socketTestHandler}/>
      <button onClick={sendMessage}>Send</button>

    </>
  )
}