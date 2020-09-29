import { store } from 'redux/store';
import { http } from 'utils/http';
import { RESET_UPLOADED_FILE, UPLOAD_FILE } from './actionTypes';

export const uploadFile = (
  fileData,
  fileType = 'coverImage',
  prevFile = null
) => {
  const params = prevFile ? `${fileType}?prevFile=${prevFile}` : fileType;
  store.dispatch({
    type: UPLOAD_FILE,
    payload: http.post(`/upload/${params}`, fileData)
  });
};
export const resetUploadedFile = () => {
  store.dispatch({
    type: RESET_UPLOADED_FILE,
    payload: ''
  });
};
