import {
  GET_USERS,
  GET_USERS_FAIL,
  GET_USERS_SUCCESS,
  CHANGE_USERS_PAGE_SIZE,
  CHANGE_USERS_PAGE_NUMBER,
  CHANGE_USERS_SORT,
  CHANGE_USERS_SEARCH_TEXT,
} from "./actionTypes";

export const getUsers = () => ({
  type: GET_USERS,
});

export const getUsersSuccess = (users) => ({
  type: GET_USERS_SUCCESS,
  payload: users,
});

export const getUsersFail = (error) => ({
  type: GET_USERS_FAIL,
  payload: error,
});

export const changeUsersPageSize = (PageSize) => ({
  type: CHANGE_USERS_PAGE_SIZE,
  payload: PageSize,
});

export const changeUsersPageNumber = (PageNumber) => ({
  type: CHANGE_USERS_PAGE_NUMBER,
  payload: PageNumber,
});

export const changeUsersSort = (Sort) => ({
  type: CHANGE_USERS_SORT,
  payload: Sort,
});

export const changeUsersSearchText = (SearchText) => ({
  type: CHANGE_USERS_SEARCH_TEXT,
  payload: SearchText,
});
