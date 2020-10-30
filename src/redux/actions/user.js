import { store } from 'redux/store';
import { http } from 'utils/http';
import { GET_USERS } from './actionTypes';

export const getUsers = ({ pageSize = 20, pageNumber = 1 }) => {
  const params = `pageSize=${pageSize}&page=${pageNumber}`;
  store.dispatch({
    type: GET_USERS,
    payload: http.get(`/users?${params}`)
  });
};
