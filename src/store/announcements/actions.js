import {
  GET_ANNOUNCEMENT,
  GET_ANNOUNCEMENT_FAIL,
  GET_ANNOUNCEMENT_SUCCESS,
  CHANGE_ANNOUNCEMENT_PAGE_SIZE,
  CHANGE_ANNOUNCEMENT_PAGE_NUMBER,
  CHANGE_ANNOUNCEMENT_SORT,
  CHANGE_ANNOUNCEMENT_SEARCH_TEXT,
  CHANGE_ANNOUNCEMENT_NOTI_TYPE,
} from "./actionTypes";

export const getAnnouncement = () => ({
  type: GET_ANNOUNCEMENT,
});

export const getAnnouncementSuccess = (announcements) => ({
  type: GET_ANNOUNCEMENT_SUCCESS,
  payload: announcements,
});

export const getAnnouncementFail = (error) => ({
  type: GET_ANNOUNCEMENT_FAIL,
  payload: error,
});

export const changeAnnouncementPageSize = (announcementPageSize) => ({
  type: CHANGE_ANNOUNCEMENT_PAGE_SIZE,
  payload: announcementPageSize,
});

export const changeAnnouncementPageNumber = (announcementPageNumber) => ({
  type: CHANGE_ANNOUNCEMENT_PAGE_NUMBER,
  payload: announcementPageNumber,
});

export const changeAnnouncementSort = (announcementSort) => ({
  type: CHANGE_ANNOUNCEMENT_SORT,
  payload: announcementSort,
});

export const changeAnnouncementSearchText = (announcementSearchText) => ({
  type: CHANGE_ANNOUNCEMENT_SEARCH_TEXT,
  payload: announcementSearchText,
});

export const changeAnnouncementNotiType = (announcementNotiType) => ({
  type: CHANGE_ANNOUNCEMENT_NOTI_TYPE,
  payload: announcementNotiType,
});
