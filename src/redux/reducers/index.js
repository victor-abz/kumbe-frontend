import { combineReducers } from 'redux';

import {
  loginReducer,
  authReducer,
  registerReducer,
  logOutReducer
} from './authReducer';
import {
  blogAddReducer,
  blogsGetReducer,
  blogGetReducer,
  blogEditReducer,
  blogPublishReducer
} from './blogReducer';
import { categoryAddReducer, categoryGetReducer } from './categoryReducer';
import { fileReducer } from './fileReducer';
import {
  mediaAddReducer,
  mediaDetailReducer,
  mediaEditReducer,
  mediaGetReducer
} from './mediaReducers';
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
  blogsGet: blogsGetReducer,
  blogGet: blogGetReducer,
  mediaAdd: mediaAddReducer,
  mediaGet: mediaGetReducer,
  mediaEdit: mediaEditReducer,
  mediaDetail: mediaDetailReducer,
  logOut: logOutReducer,
  blogEdit: blogEditReducer,
  blogPublish:blogPublishReducer
});
