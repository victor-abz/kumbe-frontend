import { UPLOAD_FILE } from 'redux/actions/actionTypes';
import { baseState, fulfilled, pending, rejected } from 'redux/utils';
import { UPLOADED_FILE_NAME } from 'utils/constants';

const uploadedFileName = localStorage.getItem(UPLOADED_FILE_NAME) || '';
const initialState = baseState('fileName', uploadedFileName);

export const fileReducer = (state = initialState, action) => {
  switch (action.type) {
    case pending(UPLOAD_FILE):
      return {
        ...state,
        loading: true
      };
    case fulfilled(UPLOAD_FILE):
      return {
        ...state,
        loading: false,
        loaded: true,
        fileName: action.payload.data.data
      };
    case rejected(UPLOAD_FILE):
    default:
      return {
        ...state,
        loading: false,
        loaded: false
      };
  }
};
