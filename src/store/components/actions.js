import {
  GET_COMPONENTS,
  GET_COMPONENTS_FAIL,
  GET_COMPONENTS_SUCCESS,
  CHANGE_COMPONENT_DEVICE_TYPE,
  CHANGE_COMPONENT_NOTI_TYPE,
  CHANGE_COMPONENT_PAGE_NUMBER,
  CHANGE_COMPONENT_SEARCH_TEXT,
  CHANGE_COMPONENT_SORT,
  CHANGE_COMPONENT_PAGE_SIZE,
} from "./actionTypes";

export const getComponents = () => ({
  type: GET_COMPONENTS,
});

export const getComponentsSuccess = (components) => ({
  type: GET_COMPONENTS_SUCCESS,
  payload: components,
});

export const getComponentsFail = (error) => ({
  type: GET_COMPONENTS_FAIL,
  payload: error,
});

export const changeComponentPageSize = (PageSize) => ({
  type: CHANGE_COMPONENT_PAGE_SIZE,
  payload: PageSize,
});
export const changeComponentPageNumber = (PageNumber) => ({
  type: CHANGE_COMPONENT_PAGE_NUMBER,
  payload: PageNumber,
});

export const changeComponentSort = (Sort) => ({
  type: CHANGE_COMPONENT_SORT,
  payload: Sort,
});
export const changeComponentSearchText = (SearchText) => ({
  type: CHANGE_COMPONENT_SEARCH_TEXT,
  payload: SearchText,
});
export const changeComponentNotiType = (NotiType) => ({
  type: CHANGE_COMPONENT_NOTI_TYPE,
  payload: NotiType,
});
export const changeComponentDeviceType = (DeviceType) => ({
  type: CHANGE_COMPONENT_DEVICE_TYPE,
  payload: DeviceType,
});
