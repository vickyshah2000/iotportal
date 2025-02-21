import { call, put, select, takeEvery } from "redux-saga/effects";

// Crypto Redux States
import {
  GET_RECORDING,
  CHANGE_RECORDING_PAGE_NUMBER,
  CHANGE_RECORDING_PAGE_SIZE,
  CHANGE_RECORDING_SEARCH_TEXT,
  CHANGE_RECORDING_SORT,
} from "./actionTypes";
import { getRecordingSuccess, getRecordingFail } from "./actions";

//Include Both Helper File with needed methods

import getRecordingList from "../../helpers/custom_helper/data/getRecordingList";

function* fetchRecording() {
  try {
    const all = yield select((state) => state.recordings);
    const PageSize = yield select(
      (state) => state.recordings.recordingPageSize
    );
    const SortOrder = yield select(
      (state) => state.recordings.recordingSort.recordingSortOrder
    );
    const SortColumn = yield select(
      (state) => state.recordings.recordingSort.recordingSortColumn
    );
    const SearchText = yield select(
      (state) => state.recordings.recordingSearchText
    );
    const PageNumber = yield select(
      (state) => state.recordings.recordingPageNumber
    );
    const NotiType = yield select(
      (state) => state.recordings.recordingNotiType
    );

    const response = yield call(getRecordingList, {
      PageSize,
      PageNumber,
      SortOrder,
      SortColumn,
      SearchText,
      NotiType,
    });
    // console.log(response);
    // const response = yield recording(getPole);
    yield put(getRecordingSuccess(response));
  } catch (error) {
    yield put(getRecordingFail(error));
  }
}

function* recordingsSaga() {
  yield takeEvery(GET_RECORDING, fetchRecording);
  yield takeEvery(CHANGE_RECORDING_PAGE_SIZE, fetchRecording); // Listen for page size changes
  yield takeEvery(CHANGE_RECORDING_PAGE_NUMBER, fetchRecording); // Listen for page index changes
  yield takeEvery(CHANGE_RECORDING_SORT, fetchRecording); // Listen for sort order changes
  yield takeEvery(CHANGE_RECORDING_SEARCH_TEXT, fetchRecording);
}

export default recordingsSaga;
