import {
  GET_VMD_SUCCESS,
  GET_VMD_FAIL,
  CHANGE_VMD_PAGE_NUMBER,
  CHANGE_VMD_PAGE_SIZE,
  CHANGE_VMD_SORT,
  CHANGE_VMD_SEARCH_TEXT,
  CHANGE_VMD_NOTI_TYPE,
} from "./actionTypes";

const INIT_STATE = {
  vmds: [],
  error: {},
  vmdPageSize: 10,
  vmdPageNumber: 0,
  vmdSort: { vmdSortColumn: "", vmdSortOrder: "" },
  vmdSearchText: "",
  vmdNotiType: 0,
};

const vmds = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_VMD_SUCCESS:
      return {
        ...state,
        vmds: action.payload,
      };

    case GET_VMD_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case CHANGE_VMD_PAGE_SIZE:
      return {
        ...state,
        vmdPageSize: action.payload,
      };
    case CHANGE_VMD_PAGE_NUMBER:
      return {
        ...state,
        vmdPageNumber: action.payload,
      };
    case CHANGE_VMD_SORT:
      return {
        ...state,
        vmdSort: action.payload,
      };
    case CHANGE_VMD_SEARCH_TEXT:
      return {
        ...state,
        vmdSearchText: action.payload,
      };

    case CHANGE_VMD_NOTI_TYPE:
      return {
        ...state,
        vmdNotiType: action.payload,
      };
    default:
      return state;
  }
};

export default vmds;
