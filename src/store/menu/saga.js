import { call, put, takeEvery } from "redux-saga/effects";

import { GET_MENU } from "./actionTypes";
import { getMenuSuccess, getMenuFail } from "./actions";

import getRoleMenu from "../../helpers/custom_helper/role-user-mangement/getRoleMenu";

function* fetchMenu() {
  try {
    const response = yield call(getRoleMenu);

    yield put(getMenuSuccess(response));
  } catch (error) {
    yield put(getMenuFail(error));
  }
}

function* menuSaga() {
  yield takeEvery(GET_MENU, fetchMenu);
}

export default menuSaga;
