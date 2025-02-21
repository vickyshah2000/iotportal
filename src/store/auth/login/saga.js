import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import Cookies from "js-cookie";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess } from "./actions";
import loginCall from "../../../helpers/AuthType/backend";

function* loginUser({ payload: { user, history } }) {
  try {
    const res = yield call(loginCall, user);
    console.log(res);
    if (res.msg === "Login Successfully...") {
      yield put(loginSuccess(res));
      Cookies.set("authUser", JSON.stringify(res), { expires: 1 / 12 });
      if(res.role === "Admin"){
        yield history.push("/entity-table");
      }else{
        yield history.push("/iotdashboard");
      }
      
    } else if (res.message === "Wrong Credentials") {
      yield put(apiError({ message: res.message }));
    } else {
      yield put(apiError({ message: res.message }));
    }
  } catch (error) {
    yield put(apiError(error));
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    Cookies.remove("authUser");
    if (import.meta.env.VITE_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.logout);
      yield put(logoutUserSuccess(response));
    }
    history.push("/login");
  } catch (error) {
    yield put(apiError(error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
