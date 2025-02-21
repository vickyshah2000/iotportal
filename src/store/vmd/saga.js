import { call, put, select, takeEvery } from "redux-saga/effects";

// Crypto Redux States
import {
  GET_VMD,
  CHANGE_VMD_PAGE_NUMBER,
  CHANGE_VMD_PAGE_SIZE,
  CHANGE_VMD_SEARCH_TEXT,
  CHANGE_VMD_SORT,
} from "./actionTypes";
import { getVmdSuccess, getVmdFail } from "./actions";

//Include Both Helper File with needed methods

import getVmdList from "../../helpers/custom_helper/vmd/getVmdList";

function* fetchVmd() {
  try {
    const all = yield select((state) => state.vmds);
    const PageSize = yield select((state) => state.vmds.vmdPageSize);
    const SortOrder = yield select((state) => state.vmds.vmdSort.vmdSortOrder);
    const SortColumn = yield select(
      (state) => state.vmds.vmdSort.vmdSortColumn
    );
    const SearchText = yield select((state) => state.vmds.vmdSearchText);
    const PageNumber = yield select((state) => state.vmds.vmdPageNumber);
    const NotiType = yield select((state) => state.vmds.vmdNotiType);

    console.log(all);
    const response = yield call(getVmdList, {
      PageSize,
      PageNumber,
      SortOrder,
      SortColumn,
      SearchText,
      NotiType,
    });
    console.log(response);
    // const response = yield vmd(getPole);
    yield put(getVmdSuccess(response));
  } catch (error) {
    yield put(getVmdFail(error));
  }
}

function* vmdsSaga() {
  yield takeEvery(GET_VMD, fetchVmd);
  yield takeEvery(CHANGE_VMD_PAGE_SIZE, fetchVmd); // Listen for page size changes
  yield takeEvery(CHANGE_VMD_PAGE_NUMBER, fetchVmd); // Listen for page index changes
  yield takeEvery(CHANGE_VMD_SORT, fetchVmd); // Listen for sort order changes
  yield takeEvery(CHANGE_VMD_SEARCH_TEXT, fetchVmd);
}

export default vmdsSaga;
