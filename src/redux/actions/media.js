import { store } from 'redux/store';
import { http } from 'utils/http';
import { ADD_NEW_MEDIA, GET_MEDIAS } from './actionTypes';

export const addMedia = (newMedia = {}) => {
  store.dispatch({
    type: ADD_NEW_MEDIA,
    payload: http.post('/medias', newMedia)
  });
};
export const getMedias = (mediaType = 'all') => {
  store.dispatch({
    type: GET_MEDIAS,
    payload: http.get(`/medias/${mediaType}`)
  });
};
