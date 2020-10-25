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
  blogPublishReducer,
  blogLikeReducer,
  blogShareReducer
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
import { updateProfileReducer } from './profileReducer';
import {
  commentAddReducer,
  commentApproveReducer,
  commentGetReducer
} from './commentReducer';
import {
  qtnAddReducer,
  qtnsGetReducer,
  qtnGetReducer,
  repliesGetReducer,
  replyAddReducer,
  qtnLikeReducer,
  replyReactReducer
} from './forumReducers';
import {
  productAddReducer,
  productDeleteReducer,
  productEditReducer,
  productsGetReducer
} from './productReducer';
import {
  partnerAddReducer,
  partnerDeleteReducer,
  partnersGetReducer
} from './partnerReducer';

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
  blogPublish: blogPublishReducer,
  updateProfile: updateProfileReducer,
  commentsGet: commentGetReducer,
  commentApprove: commentApproveReducer,
  blogLike: blogLikeReducer,
  blogShare: blogShareReducer,
  commentAdd: commentAddReducer,
  qtnAdd: qtnAddReducer,
  qtnsGet: qtnsGetReducer,
  qtnGet: qtnGetReducer,
  replyAdd: replyAddReducer,
  repliesGet: repliesGetReducer,
  productAdd: productAddReducer,
  productsGet: productsGetReducer,
  productEdit: productEditReducer,
  productRm: productDeleteReducer,
  qtnLike: qtnLikeReducer,
  replyReact: replyReactReducer,
  partnerAdd: partnerAddReducer,
  partnersGet: partnerDeleteReducer,
  partnerRm: partnersGetReducer
});
