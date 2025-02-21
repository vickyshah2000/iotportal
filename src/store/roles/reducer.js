import { GET_ROLES_SUCCESS, GET_ROLES_FAIL } from "./actionTypes";

const INIT_STATE = {
  roles: [],
  error: {},
};

const roles = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ROLES_SUCCESS:
      return {
        ...state,
        roles: action.payload,
      };

    case GET_ROLES_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default roles;
