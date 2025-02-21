import { call, put, takeEvery } from "redux-saga/effects";

import { GET_ROLES } from "./actionTypes";
import { getRolesSuccess, getRolesFail } from "./actions";

import getRoles from "../../helpers/custom_helper/role-user-mangement/getRoles";

function* fetchRoles() {
  try {
    const response = yield call(getRoles);

    yield put(getRolesSuccess(response));
  } catch (error) {
    yield put(getRolesFail(error));
  }
}

function* rolesSaga() {
  yield takeEvery(GET_ROLES, fetchRoles);
}

export default rolesSaga;
