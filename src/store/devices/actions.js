import {
  GET_DEVICES,
  GET_DEVICES_FAIL,
  GET_DEVICES_SUCCESS,
} from "./actionTypes";

export const getDevices = () => ({
  type: GET_DEVICES,
});

export const getDevicesSuccess = (devices) => ({
  type: GET_DEVICES_SUCCESS,
  payload: devices,
});

export const getDevicesFail = (error) => ({
  type: GET_DEVICES_FAIL,
  payload: error,
});
