import { store } from 'redux/store';
import { http } from 'utils/http';
import { UPLOAD_FILE } from './actionTypes';

export const uploadFile = (fileData, fileType = 'coverImage') => {
  store.dispatch({
    type: UPLOAD_FILE,
    payload: http.post(`/upload/${fileType}`, fileData)
  });
};
