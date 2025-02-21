import { call, put, select, takeEvery } from "redux-saga/effects";

// Crypto Redux States
import {
  GET_POLES,
  CHANGE_PAGE_NUMBER,
  CHANGE_PAGE_SIZE,
  CHANGE_SEARCH_TEXT,
  CHANGE_SORT,
} from "./actionTypes";
import { getPolesSuccess, getPolesFail } from "./actions";

//Include Both Helper File with needed methods

import getPoles from "../../helpers/custom_helper/data/getPole";

function* fetchPoles() {
  try {
    const PageSize = yield select((state) => state.poles.PageSize);
    const SortOrder = yield select((state) => state.poles.Sort.SortOrder);
    const SortColumn = yield select((state) => state.poles.Sort.SortColumn);
    const SearchText = yield select((state) => state.poles.SearchText);
    const PageNumber = yield select((state) => state.poles.PageNumber);
    const NotiType = yield select((state) => state.poles.NotiType);

    const response = yield call(getPoles, {
      PageSize,
      PageNumber,
      SortOrder,
      SortColumn,
      SearchText,
      NotiType,
    });
    // const response = yield call(getPole);
    yield put(getPolesSuccess(response));
  } catch (error) {
    yield put(getPolesFail(error));
  }
}

function* polesSaga() {
  yield takeEvery(GET_POLES, fetchPoles);
  yield takeEvery(CHANGE_PAGE_SIZE, fetchPoles); // Listen for page size changes
  yield takeEvery(CHANGE_PAGE_NUMBER, fetchPoles); // Listen for page index changes
  yield takeEvery(CHANGE_SORT, fetchPoles); // Listen for sort order changes
  yield takeEvery(CHANGE_SEARCH_TEXT, fetchPoles);
}

export default polesSaga;
