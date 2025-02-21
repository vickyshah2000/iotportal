import {
  GET_DEVICES_H,
  GET_DEVICES_H_FAIL,
  GET_DEVICES_H_SUCCESS,
} from "./actionTypes";

export const getDevicesH = () => ({
  type: GET_DEVICES_H,
});

export const getDevicesHSuccess = (devices_h) => ({
  type: GET_DEVICES_H_SUCCESS,
  payload: devices_h,
});

export const getDevicesHFail = (error) => ({
  type: GET_DEVICES_H_FAIL,
  payload: error,
});
