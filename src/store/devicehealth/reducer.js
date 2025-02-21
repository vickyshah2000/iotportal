import { GET_DEVICES_H_SUCCESS, GET_DEVICES_H_FAIL } from "./actionTypes";

const INIT_STATE = {
  devices_h: [],
  error: {},
};

const devices_h = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_DEVICES_H_SUCCESS:
      return {
        ...state,
        devices_h: action.payload,
      };

    case GET_DEVICES_H_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default devices_h;
