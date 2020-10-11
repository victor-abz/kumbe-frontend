import { store } from 'redux/store';
import { http } from 'utils/http';
import { UPDATE_PROFILE } from './actionTypes';

export const updateProfile = (newProfile = {}) => {
  store.dispatch({
    type: UPDATE_PROFILE,
    payload: http.patch('/users/update', newProfile)
  });
};