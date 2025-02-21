import { call, put, select, takeEvery } from "redux-saga/effects";

// Crypto Redux States
import {
  GET_CALLS,
  CHANGE_CALLS_PAGE_NUMBER,
  CHANGE_CALLS_PAGE_SIZE,
  CHANGE_CALLS_SEARCH_TEXT,
  CHANGE_CALLS_SORT,
} from "./actionTypes";
import { getCallsSuccess, getCallsFail } from "./actions";

//Include Both Helper File with needed methods

import getCallLogs from "../../helpers/custom_helper/data/getCallLogs";

function* fetchCalls() {
  try {
    const all = yield select((state) => state.calls);
    const PageSize = yield select((state) => state.calls.callPageSize);
    const SortOrder = yield select(
      (state) => state.calls.callSort.callSortOrder
    );
    const SortColumn = yield select(
      (state) => state.calls.callSort.callSortColumn
    );
    const SearchText = yield select((state) => state.calls.callSearchText);
    const PageNumber = yield select((state) => state.calls.callPageNumber);
    const NotiType = yield select((state) => state.calls.callNotiType);

    console.log(all);
    const response = yield call(getCallLogs, {
      PageSize,
      PageNumber,
      SortOrder,
      SortColumn,
      SearchText,
      NotiType,
    });
    console.log(response);
    // const response = yield call(getPole);
    yield put(getCallsSuccess(response));
  } catch (error) {
    yield put(getCallsFail(error));
  }
}

function* callsSaga() {
  yield takeEvery(GET_CALLS, fetchCalls);
  yield takeEvery(CHANGE_CALLS_PAGE_SIZE, fetchCalls); // Listen for page size changes
  yield takeEvery(CHANGE_CALLS_PAGE_NUMBER, fetchCalls); // Listen for page index changes
  yield takeEvery(CHANGE_CALLS_SORT, fetchCalls); // Listen for sort order changes
  yield takeEvery(CHANGE_CALLS_SEARCH_TEXT, fetchCalls);
}

export default callsSaga;
