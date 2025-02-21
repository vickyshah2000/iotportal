import { all, fork } from "redux-saga/effects";

//public
import AccountSaga from "./auth/register/saga";
import AuthSaga from "./auth/login/saga";
import ForgetSaga from "./auth/forgetpwd/saga";
import ProfileSaga from "./auth/profile/saga";
import LayoutSaga from "./layout/saga";

import calendarSaga from "./calendar/saga";
import polesSaga from "./poles/saga";
import componentsSaga from "./components/saga";
import devicesSaga from "./devices/saga";
import rolesSaga from "./roles/saga";
import menuSaga from "./menu/saga";
import usersSaga from "./users/saga";
import circleSaga from "./circle/saga";
// import polesSaga from "./poles/saga";
import callsSaga from "./callLog/saga";
import recordingsSaga from "./recording/saga";
import announcementsSaga from "./announcements/saga";
import vmdsSaga from "./vmd/saga";
import devices_hSaga from "./devicehealth/saga";
import componentsHealthSaga from "./componentHealth/saga";

export default function* rootSaga() {
  yield all([
    //public
    fork(AccountSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(LayoutSaga),
    fork(devicesSaga),
    fork(calendarSaga),
    fork(polesSaga),
    fork(componentsSaga),
    fork(rolesSaga),
    fork(menuSaga),
    fork(usersSaga),
    fork(circleSaga),
    fork(callsSaga),
    fork(recordingsSaga),
    fork(announcementsSaga),
    fork(vmdsSaga),
    fork(devices_hSaga),
    fork(componentsHealthSaga),
  ]);
}
