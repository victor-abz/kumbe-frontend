import { store } from 'redux/store';
import { http } from 'utils/http';
import {
  ADD_NEW_MEDIA,
  GET_MEDIAS,
  GET_MEDIA_DETAIL,
  UPDATE_MEDIA
} from './actionTypes';

export const addMedia = (newMedia = {}) => {
  let mediaObj = newMedia;
  if (newMedia.type === 'image') {
    mediaObj = { ...newMedia, title: 'Image', description: 'Image' };
  }
  store.dispatch({
    type: ADD_NEW_MEDIA,
    payload: http.post('/medias', mediaObj)
  });
};
export const getMedias = (mediaType = 'all') => {
  const params = `?mediaType=${mediaType}`;
  store.dispatch({
    type: GET_MEDIAS,
    payload: http.get(`/medias${params}`)
  });
};
export const updateMedia = (mediaId = '', media = {}) => {
  delete media.id;
  store.dispatch({
    type: UPDATE_MEDIA,
    payload: http.patch(`/medias/${mediaId}`, media)
  });
};
export const getMediaDetail = (mediaId = '') => {
  store.dispatch({
    type: GET_MEDIA_DETAIL,
    payload: http.get(`/medias/${mediaId}`)
  });
};
