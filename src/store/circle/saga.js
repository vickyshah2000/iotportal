import { call, put, takeEvery } from "redux-saga/effects";

import { GET_CIRCLE } from "./actionTypes";
import { getCircleSuccess, getCircleFail } from "./actions";

import getCircleMenu from "../../helpers/custom_helper/role-user-mangement/getCircle";

function* fetchCircle() {
  try {
    const response = yield call(getCircleMenu);
    // console.log(response);
    yield put(getCircleSuccess(response));
  } catch (error) {
    yield put(getCircleFail(error));
  }
}

function* circleSaga() {
  yield takeEvery(GET_CIRCLE, fetchCircle);
}

export default circleSaga;
