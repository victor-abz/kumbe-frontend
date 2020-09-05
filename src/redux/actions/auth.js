import { store } from 'redux/store';
import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  GET_USER_PROFILE,
  SET_AUTH_USER
} from './actionTypes';
import { http } from 'utils/http';

export const loginUser = userInfo => {
  store.dispatch({
    type: LOGIN_USER,
    payload: http.post('/users/signin', userInfo)
  });
};
export const registerUser = user => {
  store.dispatch({
    type: REGISTER_USER,
    payload: http.post('/users/signup', user)
  });
};
export const logoutUser = () => {
  store.dispatch({
    type: LOGOUT_USER,
    payload: http.post('/users/logout')
  });
};
export const setUser = userInfo => {
  store.dispatch({
    type: SET_AUTH_USER,
    payload: userInfo
  });
};
export const getUserProfile = () => {
  store.dispatch({
    type: GET_USER_PROFILE,
    payload: http.get('/users/profile')
  });
};
