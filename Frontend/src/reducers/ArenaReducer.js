export const initialState = {
  win: false,
  isP1Turn: true,
  P1Fingers: { left: 1, right: 1 },
  P2Fingers: { left: 1, right: 1 },
  P1Score: 0,
  P2Score: 0,
};

export const ArenaReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_WIN":
      return { ...state, win: action.payload };
    case "UPDATE_TURN":
      return { ...state, isP1Turn: action.payload }
    case "UPDATE_P1_FINGERS_LEFT":
      return {
        ...state,
        P2Fingers: {
          ...state.P2Fingers,
          left: action.payload
        }
      };
    case "UPDATE_P1_FINGERS_RIGHT":
      return {
        ...state,
        P2Fingers: {
          ...state.P2Fingers,
          right: action.payload
        }
      };
    case "UPDATE_P2_FINGERS_LEFT":
      return {
        ...state,
        P2Fingers: {
          ...state.P2Fingers,
          left: action.payload
        }
      };
    case "UPDATE_P2_FINGERS_RIGHT":
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
    default:
      return state;
  }
};