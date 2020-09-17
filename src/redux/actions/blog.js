import { store } from 'redux/store';
import { http } from 'utils/http';
import { ADD_NEW_BLOG } from './actionTypes';

export const createBlog = (newBlog = {}) => {
  store.dispatch({
    type: ADD_NEW_BLOG,
    payload: http.post('/blogs', newBlog)
  });
};
