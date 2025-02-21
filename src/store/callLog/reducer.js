import {
  GET_CALLS_SUCCESS,
  GET_CALLS_FAIL,
  CHANGE_CALLS_PAGE_NUMBER,
  CHANGE_CALLS_PAGE_SIZE,
  CHANGE_CALLS_SORT,
  CHANGE_CALLS_SEARCH_TEXT,
  CHANGE_CALLS_NOTI_TYPE,
} from "./actionTypes";

const INIT_STATE = {
  calls: [],
  error: {},
  callPageSize: 10,
  callPageNumber: 0,
  callSort: { callSortColumn: "", callSortOrder: "" },
  callSearchText: "",
  callNotiType: 0,
};

const calls = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CALLS_SUCCESS:
      return {
        ...state,
        calls: action.payload,
      };

    case GET_CALLS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case CHANGE_CALLS_PAGE_SIZE:
      return {
        ...state,
        callPageSize: action.payload,
      };
    case CHANGE_CALLS_PAGE_NUMBER:
      return {
        ...state,
        callPageNumber: action.payload,
      };
    case CHANGE_CALLS_SORT:
      return {
        ...state,
        callSort: action.payload,
      };
    case CHANGE_CALLS_SEARCH_TEXT:
      return {
        ...state,
        callSearchText: action.payload,
      };

    case CHANGE_CALLS_NOTI_TYPE:
      return {
        ...state,
        callNotiType: action.payload,
      };
    default:
      return state;
  }
};

export default calls;
