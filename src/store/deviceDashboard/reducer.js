import {
  GET_TOTAL_DEVICE,
  GET_ACTIVE_DEVICE,
  GET_INACTIVE_DEVICE,
  GET_ALL_TICKETS,
  GET_OPEN_TICKETS,
  GET_CLOSED_TICKETS,
  GET_DEVICE_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  activeDevices: "",
  inActiveDevices: "",
  totalDevices: "",
  allTickets: "",
  allOpenTickets: "",
  allClosedTickets: "",
  error: {},
};

const deviceDashboard = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_TOTAL_DEVICE:
      return {
        ...state,
        totalDevices: action.payload,
      };
    case GET_ACTIVE_DEVICE:
      return {
        ...state,
        activeDevices: action.payload,
      };
    case GET_INACTIVE_DEVICE:
      return {
        ...state,
        inActiveDevices: action.payload,
      };
    case GET_ALL_TICKETS:
      return {
        ...state,
        allTickets: action.payload,
      };
    case GET_OPEN_TICKETS:
      return {
        ...state,
        allOpenTickets: action.payload,
      };
    case GET_CLOSED_TICKETS:
      return {
        ...state,
        allClosedTickets: action.payload,
      };

    case GET_DEVICE_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default deviceDashboard;
