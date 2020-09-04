import { store } from 'redux/store';
import { LOGIN_USER, REGISTER_USER } from './actionTypes';
import { http } from 'utils/http';

export const loginUser = userInfo => {
  store.dispatch({
    type: LOGIN_USER,
    payload: http.post('/users/login', userInfo)
  });
};
export const registerUser = user => {
  store.dispatch({
    type: REGISTER_USER,
    payload: http.post('/users/signup', user)
  });
};
