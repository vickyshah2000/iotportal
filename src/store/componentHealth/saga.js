import { call, put, select, takeEvery } from "redux-saga/effects";

// Crypto Redux States
import {
  GET_COMPONENT_HEALTH,
  CHANGE_COMPONENT_HEALTH_PAGE_NUMBER,
  CHANGE_COMPONENT_HEALTH_PAGE_SIZE,
  CHANGE_COMPONENT_HEALTH_SEARCH_TEXT,
  CHANGE_COMPONENT_HEALTH_SORT,
} from "./actionTypes";
import { getComponentHealthSuccess, getComponentHealthFail } from "./actions";

//Include Both Helper File with needed methods

import getAllComponentHealth from "../../helpers/custom_helper/data/getAllComponentHealth";

function* fetchComponentHealth() {
  try {
    const sort = yield select((state) => state.componentHealth.HSort);
    console.log(sort);
    const PageSize = yield select((state) => state.componentHealth.HPageSize);
    const SortOrder = yield select(
      (state) => state.componentHealth.HSort.SortOrder
    );
    const SortColumn = yield select(
      (state) => state.componentHealth.HSort.SortColumn
    );
    const SearchText = yield select(
      (state) => state.componentHealth.HSearchText
    );
    const PageNumber = yield select(
      (state) => state.componentHealth.HPageNumber
    );
    const NotiType = yield select((state) => state.componentHealth.HNotiType);
    const DeviceTypeId = yield select(
      (state) => state.componentHealth.HDeviceTypeId
    );
    console.log("saga");
    const response = yield call(getAllComponentHealth, {
      PageSize,
      PageNumber,
      SortOrder,
      SortColumn,
      SearchText,
      NotiType,
      DeviceTypeId,
    });

    yield put(getComponentHealthSuccess(response));
  } catch (error) {
    yield put(getComponentHealthFail(error));
  }
}

function* componentsHealthSaga() {
  yield takeEvery(GET_COMPONENT_HEALTH, fetchComponentHealth);
  yield takeEvery(CHANGE_COMPONENT_HEALTH_PAGE_NUMBER, fetchComponentHealth);
  yield takeEvery(CHANGE_COMPONENT_HEALTH_PAGE_SIZE, fetchComponentHealth);
  yield takeEvery(CHANGE_COMPONENT_HEALTH_SEARCH_TEXT, fetchComponentHealth);
  yield takeEvery(CHANGE_COMPONENT_HEALTH_SORT, fetchComponentHealth);
}

export default componentsHealthSaga;
