import {
  GET_TOTAL_DEVICE,
  GET_ACTIVE_DEVICE,
  GET_INACTIVE_DEVICE,
  GET_ALL_TICKETS,
  GET_OPEN_TICKETS,
  GET_CLOSED_TICKETS,
  GET_DEVICE_FAIL,
} from "./actionTypes";

export const getTotalDevices = (devices) => ({
  type: GET_TOTAL_DEVICE,
  payload: devices,
});

export const getActiveDevices = (devices) => ({
  type: GET_ACTIVE_DEVICE,
  payload: devices,
});

export const getInactiveDevices = (devices) => ({
  type: GET_INACTIVE_DEVICE,
  payload: devices,
});
export const getAllTickets = (tickets) => ({
  type: GET_ALL_TICKETS,
  payload: tickets,
});
export const getOpenTickets = (tickets) => ({
  type: GET_OPEN_TICKETS,
  payload: tickets,
});
export const getClosedTickets = (tickets) => ({
  type: GET_CLOSED_TICKETS,
  payload: tickets,
});
export const getDeviceFail = (error) => ({
  type: GET_DEVICE_FAIL,
  payload: error,
});
