import { call, put, select, takeEvery } from "redux-saga/effects";
import { getUsersSuccess, getUsersFail } from "./actions";
import {
  GET_USERS,
  CHANGE_USERS_PAGE_SIZE,
  CHANGE_USERS_PAGE_NUMBER,
  CHANGE_USERS_SORT,
  CHANGE_USERS_SEARCH_TEXT,
} from "./actionTypes";
import getUsers from "../../helpers/custom_helper/role-user-mangement/getUsers";

function* fetchUsers() {
  try {
    const { UsersPageSize, UsersPageNumber, UsersSort, UsersSearchText } =
      yield select((state) => state.users);

    const response = yield call(getUsers, {
      PageSize: UsersPageSize,
      PageNumber: UsersPageNumber,
      SortOrder: UsersSort.SortOrder,
      SortColumn: UsersSort.SortColumn,
      SearchText: UsersSearchText,
    });

    yield put(getUsersSuccess(response));
  } catch (error) {
    yield put(getUsersFail(error));
  }
}

function* usersSaga() {
  yield takeEvery(GET_USERS, fetchUsers);
  yield takeEvery(CHANGE_USERS_PAGE_SIZE, fetchUsers);
  yield takeEvery(CHANGE_USERS_PAGE_NUMBER, fetchUsers);
  yield takeEvery(CHANGE_USERS_SORT, fetchUsers);
  yield takeEvery(CHANGE_USERS_SEARCH_TEXT, fetchUsers);
}

export default usersSaga;
