import { GET_MENU, GET_MENU_FAIL, GET_MENU_SUCCESS } from "./actionTypes";

export const getMenu = () => ({
  type: GET_MENU,
});

export const getMenuSuccess = (menu) => ({
  type: GET_MENU_SUCCESS,
  payload: menu,
});

export const getMenuFail = (error) => ({
  type: GET_MENU_FAIL,
  payload: error,
});
