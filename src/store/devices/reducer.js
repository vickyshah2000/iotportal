import { GET_DEVICES_SUCCESS, GET_DEVICES_FAIL } from "./actionTypes";

const INIT_STATE = {
  devices: [],
  error: {},
};

const devices = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_DEVICES_SUCCESS:
      return {
        ...state,
        devices: action.payload,
      };

    case GET_DEVICES_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default devices;
