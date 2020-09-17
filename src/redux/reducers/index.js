import { combineReducers } from 'redux';

import { loginReducer, authReducer, registerReducer } from './authReducer';
import { blogAddReducer, blogsGetReducer } from './blogReducer';
import { categoryAddReducer, categoryGetReducer } from './categoryReducer';
import { fileReducer } from './fileReducer';
import { tagAddReducer, tagGetReducer } from './tagReducer';

export default combineReducers({
  login: loginReducer,
  auth: authReducer,
  register: registerReducer,
  tagAdd: tagAddReducer,
  tagGet: tagGetReducer,
  categoryAdd: categoryAddReducer,
  categoryGet: categoryGetReducer,
  fileUpload: fileReducer,
  blogAdd: blogAddReducer,
  blogsGet: blogsGetReducer
});
