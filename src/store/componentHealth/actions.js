import {
  GET_COMPONENT_HEALTH,
  GET_COMPONENT_HEALTH_FAIL,
  GET_COMPONENT_HEALTH_SUCCESS,
  CHANGE_COMPONENT_HEALTH_DEVICE_TYPE,
  CHANGE_COMPONENT_HEALTH_NOTI_TYPE,
  CHANGE_COMPONENT_HEALTH_PAGE_NUMBER,
  CHANGE_COMPONENT_HEALTH_SEARCH_TEXT,
  CHANGE_COMPONENT_HEALTH_SORT,
  CHANGE_COMPONENT_HEALTH_PAGE_SIZE,
} from "./actionTypes";

export const getComponentHealth = () => ({
  type: GET_COMPONENT_HEALTH,
});

export const getComponentHealthSuccess = (componentsHealth) => ({
  type: GET_COMPONENT_HEALTH_SUCCESS,
  payload: componentsHealth,
});

export const getComponentHealthFail = (error) => ({
  type: GET_COMPONENT_HEALTH_FAIL,
  payload: error,
});

export const changeComponentHealthPageSize = (HPageSize) => ({
  type: CHANGE_COMPONENT_HEALTH_PAGE_SIZE,
  payload: HPageSize,
});
export const changeComponentHealthPageNumber = (HPageNumber) => ({
  type: CHANGE_COMPONENT_HEALTH_PAGE_NUMBER,
  payload: HPageNumber,
});

export const changeComponentHealthSort = (HSort) => ({
  type: CHANGE_COMPONENT_HEALTH_SORT,
  payload: HSort,
});
export const changeComponentHealthSearchText = (HSearchText) => ({
  type: CHANGE_COMPONENT_HEALTH_SEARCH_TEXT,
  payload: HSearchText,
});
export const changeComponentHealthNotiType = (HNotiType) => ({
  type: CHANGE_COMPONENT_HEALTH_NOTI_TYPE,
  payload: HNotiType,
});
export const changeComponentHealthDeviceType = (HDeviceType) => ({
  type: CHANGE_COMPONENT_HEALTH_DEVICE_TYPE,
  payload: HDeviceType,
});
