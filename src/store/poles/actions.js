import {
  GET_POLES,
  GET_POLES_FAIL,
  GET_POLES_SUCCESS,
  CHANGE_PAGE_SIZE,
  CHANGE_PAGE_NUMBER,
  CHANGE_SORT,
  CHANGE_SEARCH_TEXT,
  CHANGE_NOTI_TYPE,
} from "./actionTypes";

export const getPoles = () => ({
  type: GET_POLES,
});

export const getPolesSuccess = (poles) => ({
  type: GET_POLES_SUCCESS,
  payload: poles,
});

export const getPolesFail = (error) => ({
  type: GET_POLES_FAIL,
  payload: error,
});

export const changePageSize = (PageSize) => ({
  type: CHANGE_PAGE_SIZE,
  payload: PageSize,
});

export const changePageNumber = (PageNumber) => ({
  type: CHANGE_PAGE_NUMBER,
  payload: PageNumber,
});

export const changeSort = (Sort) => ({
  type: CHANGE_SORT,
  payload: Sort,
});

export const changeSearchText = (SearchText) => ({
  type: CHANGE_SEARCH_TEXT,
  payload: SearchText,
});

export const changeNotiType = (NotiType) => ({
  type: CHANGE_NOTI_TYPE,
  payload: NotiType,
});
