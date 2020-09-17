import { store } from 'redux/store';
import { ADD_NEW_TAG, GET_TAGS } from './actionTypes';
import { http } from 'utils/http';

export const addNewTag = newTag => {
  store.dispatch({
    type: ADD_NEW_TAG,
    payload: http.post('/tags', newTag)
  });
};
export const getTags = (type = 'blog') => {
  store.dispatch({
    type: GET_TAGS,
    payload: http.get(`/tags?tagType=${type}`)
  });
};
