import { store } from 'redux/store';
import { http } from 'utils/http';
import { ADD_NEW_BLOG, GET_BLOGS } from './actionTypes';

export const createBlog = (newBlog = {}) => {
  store.dispatch({
    type: ADD_NEW_BLOG,
    payload: http.post('/blogs', newBlog)
  });
};
export const getBlogs = (search = '', pageSize = 3, pageNumber = 1) => {
  const blogParams = `$search=${search}&pageSize=${pageSize}&page=${pageNumber}`;
  store.dispatch({
    type: GET_BLOGS,
    payload: http.get(`/blogs?${blogParams}`)
  });
};
