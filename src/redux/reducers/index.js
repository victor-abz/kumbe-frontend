import { combineReducers } from 'redux';

import { loginReducer, authReducer, registerReducer } from './authReducer';

export default combineReducers({
  login: loginReducer,
  auth: authReducer,
  register: registerReducer
});
