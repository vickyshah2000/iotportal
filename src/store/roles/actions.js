import { GET_ROLES, GET_ROLES_FAIL, GET_ROLES_SUCCESS } from "./actionTypes";

export const getRoles = () => ({
  type: GET_ROLES,
});

export const getRolesSuccess = (roles) => ({
  type: GET_ROLES_SUCCESS,
  payload: roles,
});

export const getRolesFail = (error) => ({
  type: GET_ROLES_FAIL,
  payload: error,
});
