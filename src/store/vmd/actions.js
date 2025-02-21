import {
  GET_VMD,
  GET_VMD_FAIL,
  GET_VMD_SUCCESS,
  CHANGE_VMD_PAGE_SIZE,
  CHANGE_VMD_PAGE_NUMBER,
  CHANGE_VMD_SORT,
  CHANGE_VMD_SEARCH_TEXT,
  CHANGE_VMD_NOTI_TYPE,
} from "./actionTypes";

export const getVmd = () => ({
  type: GET_VMD,
});

export const getVmdSuccess = (vmds) => ({
  type: GET_VMD_SUCCESS,
  payload: vmds,
});

export const getVmdFail = (error) => ({
  type: GET_VMD_FAIL,
  payload: error,
});

export const changeVmdPageSize = (vmdPageSize) => ({
  type: CHANGE_VMD_PAGE_SIZE,
  payload: vmdPageSize,
});

export const changeVmdPageNumber = (vmdPageNumber) => ({
  type: CHANGE_VMD_PAGE_NUMBER,
  payload: vmdPageNumber,
});

export const changeVmdSort = (vmdSort) => ({
  type: CHANGE_VMD_SORT,
  payload: vmdSort,
});

export const changeVmdSearchText = (vmdSearchText) => ({
  type: CHANGE_VMD_SEARCH_TEXT,
  payload: vmdSearchText,
});

export const changeVmdNotiType = (vmdNotiType) => ({
  type: CHANGE_VMD_NOTI_TYPE,
  payload: vmdNotiType,
});
