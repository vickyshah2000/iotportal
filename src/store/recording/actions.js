import {
  GET_RECORDING,
  GET_RECORDING_FAIL,
  GET_RECORDING_SUCCESS,
  CHANGE_RECORDING_PAGE_SIZE,
  CHANGE_RECORDING_PAGE_NUMBER,
  CHANGE_RECORDING_SORT,
  CHANGE_RECORDING_SEARCH_TEXT,
  CHANGE_RECORDING_NOTI_TYPE,
} from "./actionTypes";

export const getRecording = () => ({
  type: GET_RECORDING,
});

export const getRecordingSuccess = (recordings) => ({
  type: GET_RECORDING_SUCCESS,
  payload: recordings,
});

export const getRecordingFail = (error) => ({
  type: GET_RECORDING_FAIL,
  payload: error,
});

export const changeRecordingPageSize = (recordingPageSize) => ({
  type: CHANGE_RECORDING_PAGE_SIZE,
  payload: recordingPageSize,
});

export const changeRecordingPageNumber = (recordingPageNumber) => ({
  type: CHANGE_RECORDING_PAGE_NUMBER,
  payload: recordingPageNumber,
});

export const changeRecordingSort = (recordingSort) => ({
  type: CHANGE_RECORDING_SORT,
  payload: recordingSort,
});

export const changeRecordingSearchText = (recordingSearchText) => ({
  type: CHANGE_RECORDING_SEARCH_TEXT,
  payload: recordingSearchText,
});

export const changeRecordingNotiType = (recordingNotiType) => ({
  type: CHANGE_RECORDING_NOTI_TYPE,
  payload: recordingNotiType,
});
