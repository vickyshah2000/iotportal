import { GET_CIRCLE_SUCCESS, GET_CIRCLE_FAIL } from "./actionTypes";

const INIT_STATE = {
  circle: [],
  error: {},
};

const circle = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CIRCLE_SUCCESS:
      return {
        ...state,
        circle: action.payload,
      };

    case GET_CIRCLE_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default circle;
