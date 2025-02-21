import { call, put, select, takeEvery } from "redux-saga/effects";

// Crypto Redux States
import {
  GET_COMPONENTS,
  CHANGE_COMPONENT_PAGE_NUMBER,
  CHANGE_COMPONENT_PAGE_SIZE,
  CHANGE_COMPONENT_SEARCH_TEXT,
  CHANGE_COMPONENT_SORT,
} from "./actionTypes";
import { getComponentsSuccess, getComponentsFail } from "./actions";

//Include Both Helper File with needed methods

import getAllComponents from "../../helpers/custom_helper/data/getAllComponents";

function* fetchComponents() {
  try {
    const sort = yield select((state) => state.components.Sort);
    const PageSize = yield select((state) => state.components.PageSize);
    const SortOrder = yield select((state) => state.components.Sort.SortOrder);
    const SortColumn = yield select(
      (state) => state.components.Sort.SortColumn
    );
    const SearchText = yield select((state) => state.components.SearchText);
    const PageNumber = yield select((state) => state.components.PageNumber);
    const NotiType = yield select((state) => state.components.NotiType);
    const DeviceTypeId = yield select((state) => state.components.DeviceTypeId);

    const response = yield call(getAllComponents, {
      PageSize,
      PageNumber,
      SortOrder,
      SortColumn,
      SearchText,
      NotiType,
      DeviceTypeId,
    });

    yield put(getComponentsSuccess(response));
  } catch (error) {
    yield put(getComponentsFail(error));
  }
}

function* componentsSaga() {
  yield takeEvery(GET_COMPONENTS, fetchComponents);
  yield takeEvery(CHANGE_COMPONENT_PAGE_NUMBER, fetchComponents);
  yield takeEvery(CHANGE_COMPONENT_PAGE_SIZE, fetchComponents);
  yield takeEvery(CHANGE_COMPONENT_SEARCH_TEXT, fetchComponents);
  yield takeEvery(CHANGE_COMPONENT_SORT, fetchComponents);
}

export default componentsSaga;
