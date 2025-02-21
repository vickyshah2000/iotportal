import { call, put, takeEvery } from "redux-saga/effects";

import {
  GET_TOTAL_DEVICE,
  GET_ACTIVE_DEVICE,
  GET_INACTIVE_DEVICE,
  GET_ALL_TICKETS,
  GET_OPEN_TICKETS,
  GET_CLOSED_TICKETS,
  GET_DEVICE_FAIL,
} from "./actionTypes";
import {
  getActiveDevices,
  getInactiveDevices,
  getTotalDevices,
  getAllTickets,
  getClosedTickets,
  getOpenTickets,
  getDeviceFail,
} from "./actions";

import {
  getActiveDevice,
  getInactiveDevice,
  getTotalDevice,
  getTotalTicket,
  getOpenTicket,
  getClosedTicket,
} from "../../helpers/custom_helper/data/getDeviceDashboardData";

console.log("reached");
function* fetchTotalDevices() {
  try {
    const response = yield call(getTotalDevice);
    console.log(response);
    yield put(getTotalDevices(response));
  } catch (error) {
    yield put(getDeviceFail(error));
  }
}

function* fetchActiveDevices() {
  try {
    const response = yield call(getActiveDevice);
    console.log(response);
    yield put(getActiveDevices(response));
  } catch (error) {
    yield put(getDeviceFail(error));
  }
}

function* fetchInactiveDevices() {
  try {
    const response = yield call(getInactiveDevice);
    console.log(response);
    yield put(getInactiveDevices(response));
  } catch (error) {
    yield put(getDeviceFail(error));
  }
}

function* fetchTotalTicket() {
  try {
    const response = yield call(getTotalTicket);
    console.log(response);
    yield put(getAllTickets(response));
  } catch (error) {
    yield put(getDeviceFail(error));
  }
}

function* fetchOpenTicket() {
  try {
    const response = yield call(getOpenTicket);
    console.log(response);
    yield put(getOpenTickets(response));
  } catch (error) {
    yield put(getDeviceFail(error));
  }
}

function* fetchClosedTicket() {
  try {
    const response = yield call(getClosedTicket);
    console.log(response);
    yield put(getClosedTickets(response));
  } catch (error) {
    yield put(getDeviceFail(error));
  }
}

function* device_dashboardSaga() {
  yield takeEvery(GET_TOTAL_DEVICE, fetchTotalDevices);
  // yield takeEvery(GET_ACTIVE_DEVICE, fetchActiveDevices);
  // yield takeEvery(GET_INACTIVE_DEVICE, fetchInactiveDevices);
  // yield takeEvery(GET_ALL_TICKETS, fetchTotalTicket);
  // yield takeEvery(GET_OPEN_TICKETS, fetchOpenTicket);
  // yield takeEvery(GET_CLOSED_TICKETS, fetchClosedTicket);
}

export default device_dashboardSaga;
