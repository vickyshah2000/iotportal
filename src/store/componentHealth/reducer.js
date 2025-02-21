import { act } from "@testing-library/react";
import {
  GET_COMPONENT_HEALTH_SUCCESS,
  GET_COMPONENT_HEALTH_FAIL,
  CHANGE_COMPONENT_HEALTH_DEVICE_TYPE,
  CHANGE_COMPONENT_HEALTH_NOTI_TYPE,
  CHANGE_COMPONENT_HEALTH_PAGE_NUMBER,
  CHANGE_COMPONENT_HEALTH_PAGE_SIZE,
  CHANGE_COMPONENT_HEALTH_SEARCH_TEXT,
  CHANGE_COMPONENT_HEALTH_SORT,
} from "./actionTypes";

const INIT_STATE = {
  componentsHealth: [],
  error: {},
  HSearchText: "",
  HSort: { SortColumn: "", SortOrder: "" },
  HPageNumber: 0,
  HPageSize: 10,
  HNotiType: 0,
  HDeviceTypeId: "1",
};

const components = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_COMPONENT_HEALTH_SUCCESS:
      return {
        ...state,
        componentsHealth: action.payload,
      };

    case GET_COMPONENT_HEALTH_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case CHANGE_COMPONENT_HEALTH_PAGE_SIZE:
      return {
        ...state,
        HPageSize: action.payload,
      };
    case CHANGE_COMPONENT_HEALTH_PAGE_NUMBER:
      return {
        ...state,
        HPageNumber: action.payload,
      };

    case CHANGE_COMPONENT_HEALTH_SEARCH_TEXT:
      return {
        ...state,
        HSearchText: action.payload,
      };
    case CHANGE_COMPONENT_HEALTH_SORT:
      return {
        ...state,
        HSort: action.payload,
      };
    case CHANGE_COMPONENT_HEALTH_NOTI_TYPE:
      return {
        ...state,
        HNotiType: action.payload,
      };
    case CHANGE_COMPONENT_HEALTH_DEVICE_TYPE:
      return {
        ...state,
        HDeviceTypeId: action.payload,
      };
    default:
      return state;
  }
};

export default components;
