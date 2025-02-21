import {
  GET_CALLS,
  GET_CALLS_FAIL,
  GET_CALLS_SUCCESS,
  CHANGE_CALLS_PAGE_SIZE,
  CHANGE_CALLS_PAGE_NUMBER,
  CHANGE_CALLS_SORT,
  CHANGE_CALLS_SEARCH_TEXT,
  CHANGE_CALLS_NOTI_TYPE,
} from "./actionTypes";

export const getCalls = () => ({
  type: GET_CALLS,
});

export const getCallsSuccess = (calls) => ({
  type: GET_CALLS_SUCCESS,
  payload: calls,
});

export const getCallsFail = (error) => ({
  type: GET_CALLS_FAIL,
  payload: error,
});

export const changeCallsPageSize = (callPageSize) => ({
  type: CHANGE_CALLS_PAGE_SIZE,
  payload: callPageSize,
});

export const changeCallsPageNumber = (callPageNumber) => ({
  type: CHANGE_CALLS_PAGE_NUMBER,
  payload: callPageNumber,
});

export const changeCallsSort = (callSort) => ({
  type: CHANGE_CALLS_SORT,
  payload: callSort,
});

export const changeCallsSearchText = (callSearchText) => ({
  type: CHANGE_CALLS_SEARCH_TEXT,
  payload: callSearchText,
});

export const changeCallsNotiType = (callNotiType) => ({
  type: CHANGE_CALLS_NOTI_TYPE,
  payload: callNotiType,
});
