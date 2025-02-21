import {
  GET_POLES_SUCCESS,
  GET_POLES_FAIL,
  CHANGE_PAGE_NUMBER,
  CHANGE_PAGE_SIZE,
  CHANGE_SORT,
  CHANGE_SEARCH_TEXT,
  CHANGE_NOTI_TYPE,
} from "./actionTypes";

const INIT_STATE = {
  poles: [],
  error: {},
  PageSize: 10,
  PageNumber: 0,
  Sort: { SortColumn: "", SortOrder: "" },
  SearchText: "",
  NotiType: 0,
};

const poles = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_POLES_SUCCESS:
      return {
        ...state,
        poles: action.payload,
      };

    case GET_POLES_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case CHANGE_PAGE_SIZE:
      return {
        ...state,
        PageSize: action.payload,
      };
    case CHANGE_PAGE_NUMBER:
      return {
        ...state,
        PageNumber: action.payload,
      };
    case CHANGE_SORT:
      return {
        ...state,
        Sort: action.payload,
      };
    case CHANGE_SEARCH_TEXT:
      return {
        ...state,
        SearchText: action.payload,
      };

    case CHANGE_NOTI_TYPE:
      return {
        ...state,
        NotiType: action.payload,
      };
    default:
      return state;
  }
};

export default poles;
