import { store } from 'redux/store';
import { http } from 'utils/http';
import { ADD_NEW_BLOG, GET_BLOGS, GET_BLOG } from './actionTypes';

export const createBlog = (newBlog = {}) => {
  store.dispatch({
    type: ADD_NEW_BLOG,
    payload: http.post('/blogs', newBlog)
  });
};
export const getBlogs = (search = '', pageSize = 4, pageNumber = 1) => {
  const blogParams = `$search=${search}&pageSize=${pageSize}&page=${pageNumber}`;
  store.dispatch({
    type: GET_BLOGS,
    payload: http.get(`/blogs?${blogParams}`)
  });
};
export const getBlog = (blogId = 1) => {
  store.dispatch({
    type: GET_BLOG,
    payload: http.get(`/blogs/${blogId}`)
  });
};