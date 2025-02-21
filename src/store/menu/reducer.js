import { GET_MENU_SUCCESS, GET_MENU_FAIL } from "./actionTypes";

const INIT_STATE = {
  menu: [],
  error: {},
};

const menu = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_MENU_SUCCESS:
      return {
        ...state,
        menu: action.payload,
      };

    case GET_MENU_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default menu;
