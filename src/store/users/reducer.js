import {
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  CHANGE_USERS_PAGE_NUMBER,
  CHANGE_USERS_PAGE_SIZE,
  CHANGE_USERS_SORT,
  CHANGE_USERS_SEARCH_TEXT,
} from "./actionTypes";

const INIT_STATE = {
  users: [],
  error: {},
  UsersPageSize: 5,
  UsersPageNumber: 0,
  UsersSort: { SortColumn: 0, SortOrder: "" },
  UsersSearchText: "",
};

const users = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };

    case GET_USERS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case CHANGE_USERS_PAGE_SIZE:
      return {
        ...state,
        UsersPageSize: action.payload,
      };
    case CHANGE_USERS_PAGE_NUMBER:
      return {
        ...state,
        UsersPageNumber: action.payload,
      };
    case CHANGE_USERS_SORT:
      return {
        ...state,
        UsersSort: action.payload,
      };
    case CHANGE_USERS_SEARCH_TEXT:
      return {
        ...state,
        UsersSearchText: action.payload,
      };

    default:
      return state;
  }
};

export default users;
