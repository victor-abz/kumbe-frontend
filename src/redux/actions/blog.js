import { store } from 'redux/store';
import { http } from 'utils/http';
import { ADD_NEW_BLOG, GET_BLOGS, GET_BLOG, UPDATE_BLOG, RESET_UPDATE_BLOG, PUBLISH_BLOG } from './actionTypes';

export const createBlog = (newBlog = {}) => {
  store.dispatch({
    type: ADD_NEW_BLOG,
    payload: http.post('/blogs', newBlog)
  });
};
export const getBlogs = ({search = '', pageSize = 20, pageNumber = 1}) => {
  const blogParams = `$search=${search}&pageSize=${pageSize}&page=${pageNumber}`;
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
export const resetUpdateBlog=()=>{
  store.dispatch({
    type: RESET_UPDATE_BLOG,
    payload: ''
  });
}
export const publishBlog=(blogId, blog)=>{
  store.dispatch({
    type: PUBLISH_BLOG,
    payload: http.put(`/blogs/publish/${blogId}`, blog)
  })
}