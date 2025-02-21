import { call, put, takeEvery } from "redux-saga/effects";

import { GET_DEVICES } from "./actionTypes";
import { getDevicesSuccess, getDevicesFail } from "./actions";

import getDevices from "../../helpers/custom_helper/data/getDevices";

function* fetchDevices() {
  try {
    const response = yield call(getDevices);
    // console.log(response);
    yield put(getDevicesSuccess(response));
  } catch (error) {
    yield put(getDevicesFail(error));
  }
}

function* devicesSaga() {
  yield takeEvery(GET_DEVICES, fetchDevices);
}

export default devicesSaga;
