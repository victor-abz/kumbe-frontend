import { store } from 'redux/store';
import { http } from 'utils/http';
import { APPROVE_COMMENT, GET_COMMENTS } from './actionTypes';

export const getComments = (
  { blogId = '', pageSize = 20, pageNumber = 1, search = '' },
  forAdmin = false
) => {
  let commentsRoute =
    blogId === '' ? '/blogs/comments/all' : `/blogs/${blogId}/comments`;
  commentsRoute += `?search=${search}&pageSize=${pageSize}&page=${pageNumber}`;
  if (forAdmin) commentsRoute += '&isAdmin=yes';
  store.dispatch({
    type: GET_COMMENTS,
    payload: http.get(commentsRoute)
  });
};
export const approveComment = (commentId, comment) => {
  store.dispatch({
    type: APPROVE_COMMENT,
    payload: http.patch(`/blogs/comments/${commentId}/approve`, comment)
  });
};
