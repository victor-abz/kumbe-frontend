import { store } from 'redux/store';
import { http } from 'utils/http';
import { CHANGE_USER_LEVEL, GET_USERS } from './actionTypes';

export const getUsers = ({ pageSize = 20, pageNumber = 1 }) => {
  const params = `pageSize=${pageSize}&page=${pageNumber}`;
  store.dispatch({
    type: GET_USERS,
    payload: http.get(`/users?${params}`)
  });
};
export const changeUserLevel = (user = {}, userId = '') => {
  store.dispatch({
    type: CHANGE_USER_LEVEL,
    payload: http.post(`/users/update/${userId}`, user)
  });
};
