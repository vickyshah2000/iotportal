import { call, put, takeEvery } from "redux-saga/effects";

import { GET_DEVICES_H } from "./actionTypes";
import { getDevicesHSuccess, getDevicesHFail } from "./actions";

import getDevicesH from "../../helpers/custom_helper/data/getDevicesH";

function* fetchDevicesH() {
  try {
    const response = yield call(getDevicesH);
    // console.log(response);
    yield put(getDevicesHSuccess(response));
  } catch (error) {
    yield put(getDevicesHFail(error));
  }
}

function* devices_hSaga() {
  yield takeEvery(GET_DEVICES_H, fetchDevicesH);
}

export default devices_hSaga;
