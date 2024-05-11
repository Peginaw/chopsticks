/* eslint-disable no-undef */
const ArenaReducer = (state, action) => {
  switch(action.type) {
    case "UPDATE_WIN":
      return { ...state, win: action.payload };
    case "UPDATE_P1_FINGERS":
      return { ...state, P1Fingers: action.payload };
    case "UPDATE_P2_FINGERS":
      return { ...state, P2Fingers: action.payload };
    case "UPDATE_P1_SCORE":
      return { ...state, P1Score: action.payload };
    case "UPDATE_P2_SCORE":
      return { ...state, P2Score: action.payload };
    default:
      return state;
  }
};

export default ArenaReducer;
