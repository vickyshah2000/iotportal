import {
  GET_RECORDING_SUCCESS,
  GET_RECORDING_FAIL,
  CHANGE_RECORDING_PAGE_NUMBER,
  CHANGE_RECORDING_PAGE_SIZE,
  CHANGE_RECORDING_SORT,
  CHANGE_RECORDING_SEARCH_TEXT,
  CHANGE_RECORDING_NOTI_TYPE,
} from "./actionTypes";

const INIT_STATE = {
  recordings: [],
  error: {},
  recordingPageSize: 10,
  recordingPageNumber: 0,
  recordingSort: { recordingSortColumn: "", recordingSortOrder: "" },
  recordingSearchText: "",
  recordingNotiType: 0,
};

const recordings = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_RECORDING_SUCCESS:
      return {
        ...state,
        recordings: action.payload,
      };

    case GET_RECORDING_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case CHANGE_RECORDING_PAGE_SIZE:
      return {
        ...state,
        recordingPageSize: action.payload,
      };
    case CHANGE_RECORDING_PAGE_NUMBER:
      return {
        ...state,
        recordingPageNumber: action.payload,
      };
    case CHANGE_RECORDING_SORT:
      return {
        ...state,
        recordingSort: action.payload,
      };
    case CHANGE_RECORDING_SEARCH_TEXT:
      return {
        ...state,
        recordingSearchText: action.payload,
      };

    case CHANGE_RECORDING_NOTI_TYPE:
      return {
        ...state,
        recordingNotiType: action.payload,
      };
    default:
      return state;
  }
};

export default recordings;
