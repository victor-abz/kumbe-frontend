import { store } from 'redux/store';
import { http } from 'utils/http';
import {
  ADD_NEW_BLOG,
  GET_BLOGS,
  GET_BLOG,
  UPDATE_BLOG,
  RESET_UPDATE_BLOG,
  PUBLISH_BLOG,
  DIS_OR_LIKE_BLOG,
  SHARE_BLOG,
  ADD_COMMENT,
  RESET_ADD_COMMENT
} from './actionTypes';

export const createBlog = (newBlog = {}) => {
  store.dispatch({
    type: ADD_NEW_BLOG,
    payload: http.post('/blogs', newBlog)
  });
};
export const getBlogs = ({
  search = '',
  pageSize = 20,
  pageNumber = 1,
  isAdmin = false,
  category = ''
}) => {
  let blogParams = `category=${category}&search=${search}&pageSize=${pageSize}&page=${pageNumber}`;
  if (isAdmin) blogParams += '&isAdmin=yes';
  store.dispatch({
    type: GET_BLOGS,
    payload: http.get(`/blogs?${blogParams}`)
  });
};
export const getBlog = (blogId = '') => {
  store.dispatch({
    type: GET_BLOG,
    payload: http.get(`/blogs/${blogId}`)
  });
};
export const updateBlog = (blog = {}, blogId = '') => {
  store.dispatch({
    type: UPDATE_BLOG,
    payload: http.patch(`/blogs/${blogId}`, blog)
  });
};
export const resetUpdateBlog = () => {
  store.dispatch({
    type: RESET_UPDATE_BLOG,
    payload: ''
  });
};
export const publishBlog = (blogId, blog) => {
  store.dispatch({
    type: PUBLISH_BLOG,
    payload: http.put(`/blogs/publish/${blogId}`, blog)
  });
};
export const likeBlog = blogId => {
  store.dispatch({
    type: DIS_OR_LIKE_BLOG,
    payload: http.patch(`/blogs/${blogId}/like`)
  });
};
export const shareBlog = blogId => {
  store.dispatch({
    type: SHARE_BLOG,
    payload: http.patch(`/blogs/${blogId}/share`)
  });
};
export const addComment = (blogId, comment) => {
  store.dispatch({
    type: ADD_COMMENT,
    payload: http.post(`/blogs/${blogId}/comments`, comment)
  });
};
export const resetAddComment = () => {
  store.dispatch({
    type: RESET_ADD_COMMENT,
    payload: ''
  });
};
