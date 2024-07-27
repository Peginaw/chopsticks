import { initialState } from "../components/Arena";


export const ArenaReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_WIN":
      return { ...state, win: action.payload };
    case "UPDATE_TURN":
      return { ...state, isP1Turn: action.payload }
    case "UPDATE_P1_FINGERS_LEFT":
      console.log("P1LUpdate:", initialState)
      return {
        ...state,
        P1Fingers: {
          ...state.P1Fingers,
          left: action.payload
        }
      };
    case "UPDATE_P1_FINGERS_RIGHT":
      console.log("P1RUpdate state:", state)
      console.log("P1RUpdate initialState:", initialState)
      console.log("Should be false. state === initialState: ",state === initialState)
      return {
        ...state,
        P1Fingers: {
          ...state.P1Fingers,
          right: action.payload
        }
      };
    case "UPDATE_P2_FINGERS_LEFT":
      console.log("P2LUpdate:", initialState)
      return {
        ...state,
        P2Fingers: {
          ...state.P2Fingers,
          left: action.payload
        }
      };
    case "UPDATE_P2_FINGERS_RIGHT":
      console.log("P2RUpdate:", initialState)
      return {
        ...state,
        P2Fingers: {
          ...state.P2Fingers,
          right: action.payload
        }
      };
    case "UPDATE_P1_SCORE":
      return { ...state, P1Score: action.payload };
    case "UPDATE_P2_SCORE":
      return { ...state, P2Score: action.payload };
      case "NEW_ROUND_RESET":
        console.log("initialState: ", initialState)
        return { 
          ...state,
          win: initialState.win,
          isP1Turn: initialState.isP1Turn,
          P1Fingers: {...initialState.P1Fingers},
          P2Fingers: {...initialState.P2Fingers},
        }
      case "NEW_GAME_RESET":
        return { 
          ...state,
          win: initialState.win,
          isP1Turn: initialState.isP1Turn,
          P1Fingers: initialState.P1Fingers,
          P2Fingers: {...initialState.P2Fingers},
          P1Score: initialState.P1Score,
          P2Score: initialState.P2Score,
        }
    default:
      return state;
  }
};