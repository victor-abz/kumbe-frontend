import { combineReducers } from 'redux';

import { loginReducer, authReducer } from './authReducer';

export default combineReducers({
  login: loginReducer,
  auth: authReducer
});
