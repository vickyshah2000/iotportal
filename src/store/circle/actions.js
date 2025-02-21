import { GET_CIRCLE, GET_CIRCLE_FAIL, GET_CIRCLE_SUCCESS } from "./actionTypes";

export const getCircle = () => ({
  type: GET_CIRCLE,
});

export const getCircleSuccess = (circle) => ({
  type: GET_CIRCLE_SUCCESS,
  payload: circle,
});

export const getCircleFail = (error) => ({
  type: GET_CIRCLE_FAIL,
  payload: error,
});
