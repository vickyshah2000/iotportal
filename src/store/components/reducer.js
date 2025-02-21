import { act } from "@testing-library/react";
import {
  GET_COMPONENTS_SUCCESS,
  GET_COMPONENTS_FAIL,
  CHANGE_COMPONENT_DEVICE_TYPE,
  CHANGE_COMPONENT_NOTI_TYPE,
  CHANGE_COMPONENT_PAGE_NUMBER,
  CHANGE_COMPONENT_PAGE_SIZE,
  CHANGE_COMPONENT_SEARCH_TEXT,
  CHANGE_COMPONENT_SORT,
} from "./actionTypes";

const INIT_STATE = {
  components: [],
  error: {},
  SearchText: "",
  Sort: { SortColumn: "", SortOrder: "" },
  PageNumber: 0,
  PageSize: 10,
  NotiType: 0,
  DeviceTypeId: "1",
};

const components = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_COMPONENTS_SUCCESS:
      return {
        ...state,
        components: action.payload,
      };

    case GET_COMPONENTS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case CHANGE_COMPONENT_PAGE_SIZE:
      return {
        ...state,
        PageSize: action.payload,
      };
    case CHANGE_COMPONENT_PAGE_NUMBER:
      return {
        ...state,
        PageNumber: action.payload,
      };

    case CHANGE_COMPONENT_SEARCH_TEXT:
      return {
        ...state,
        SearchText: action.payload,
      };
    case CHANGE_COMPONENT_SORT:
      return {
        ...state,
        Sort: action.payload,
      };
    case CHANGE_COMPONENT_NOTI_TYPE:
      return {
        ...state,
        NotiType: action.payload,
      };
    case CHANGE_COMPONENT_DEVICE_TYPE:
      return {
        ...state,
        DeviceTypeId: action.payload,
      };
    default:
      return state;
  }
};

export default components;
