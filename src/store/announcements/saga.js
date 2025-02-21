import { call, put, select, takeEvery } from "redux-saga/effects";

// Crypto Redux States
import {
  GET_ANNOUNCEMENT,
  CHANGE_ANNOUNCEMENT_PAGE_NUMBER,
  CHANGE_ANNOUNCEMENT_PAGE_SIZE,
  CHANGE_ANNOUNCEMENT_SEARCH_TEXT,
  CHANGE_ANNOUNCEMENT_SORT,
} from "./actionTypes";
import { getAnnouncementSuccess, getAnnouncementFail } from "./actions";

//Include Both Helper File with needed methods

import getAnnouncementList from "../../helpers/custom_helper/data/getAnnouncementList";

function* fetchAnnouncement() {
  try {
    const all = yield select((state) => state.announcements);
    const PageSize = yield select(
      (state) => state.announcements.announcementPageSize
    );
    const SortOrder = yield select(
      (state) => state.announcements.announcementSort.announcementSortOrder
    );
    const SortColumn = yield select(
      (state) => state.announcements.announcementSort.announcementSortColumn
    );
    const SearchText = yield select(
      (state) => state.announcements.announcementSearchText
    );
    const PageNumber = yield select(
      (state) => state.announcements.announcementPageNumber
    );
    const NotiType = yield select(
      (state) => state.announcements.announcementNotiType
    );

    const response = yield call(getAnnouncementList, {
      PageSize,
      PageNumber,
      SortOrder,
      SortColumn,
      SearchText,
      NotiType,
    });
    // console.log(response);
    // const response = yield announcement(getPole);
    yield put(getAnnouncementSuccess(response));
  } catch (error) {
    yield put(getAnnouncementFail(error));
  }
}

function* announcementsSaga() {
  yield takeEvery(GET_ANNOUNCEMENT, fetchAnnouncement);
  yield takeEvery(CHANGE_ANNOUNCEMENT_PAGE_SIZE, fetchAnnouncement); // Listen for page size changes
  yield takeEvery(CHANGE_ANNOUNCEMENT_PAGE_NUMBER, fetchAnnouncement); // Listen for page index changes
  yield takeEvery(CHANGE_ANNOUNCEMENT_SORT, fetchAnnouncement); // Listen for sort order changes
  yield takeEvery(CHANGE_ANNOUNCEMENT_SEARCH_TEXT, fetchAnnouncement);
}

export default announcementsSaga;
