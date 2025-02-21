import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";

// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";
import Profile from "./auth/profile/reducer";

//Calendar
import calendar from "./calendar/reducer";

//poles
import poles from "./poles/reducer";

// roles
import roles from "./roles/reducer";

//components
import components from "./components/reducer";

import devices from "./devices/reducer";

import menu from "./menu/reducer";

import users from "./users/reducer";

import circle from "./circle/reducer";
import calls from "./callLog/reducer";
import recordings from "./recording/reducer";
import announcements from "./announcements/reducer";
import vmds from "./vmd/reducer";
import devicehealth from "./devicehealth/reducer";
import componentHealth from "./componentHealth/reducer";

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  devices,
  calendar,
  poles,
  components,
  roles,
  menu,
  users,
  circle,
  calls,
  recordings,
  announcements,
  vmds,
  devicehealth,
  componentHealth,
});

export default rootReducer;
