import {
  GET_ANNOUNCEMENT_SUCCESS,
  GET_ANNOUNCEMENT_FAIL,
  CHANGE_ANNOUNCEMENT_PAGE_NUMBER,
  CHANGE_ANNOUNCEMENT_PAGE_SIZE,
  CHANGE_ANNOUNCEMENT_SORT,
  CHANGE_ANNOUNCEMENT_SEARCH_TEXT,
  CHANGE_ANNOUNCEMENT_NOTI_TYPE,
} from "./actionTypes";

const INIT_STATE = {
  announcements: [],
  error: {},
  announcementPageSize: 10,
  announcementPageNumber: 0,
  announcementSort: { announcementSortColumn: "", announcementSortOrder: "" },
  announcementSearchText: "",
  announcementNotiType: 0,
};

const announcements = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ANNOUNCEMENT_SUCCESS:
      return {
        ...state,
        announcements: action.payload,
      };

    case GET_ANNOUNCEMENT_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case CHANGE_ANNOUNCEMENT_PAGE_SIZE:
      return {
        ...state,
        announcementPageSize: action.payload,
      };
    case CHANGE_ANNOUNCEMENT_PAGE_NUMBER:
      return {
        ...state,
        announcementPageNumber: action.payload,
      };
    case CHANGE_ANNOUNCEMENT_SORT:
      return {
        ...state,
        announcementSort: action.payload,
      };
    case CHANGE_ANNOUNCEMENT_SEARCH_TEXT:
      return {
        ...state,
        announcementSearchText: action.payload,
      };

    case CHANGE_ANNOUNCEMENT_NOTI_TYPE:
      return {
        ...state,
        announcementNotiType: action.payload,
      };
    default:
      return state;
  }
};

export default announcements;
