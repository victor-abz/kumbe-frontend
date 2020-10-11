import { pending, fulfilled, rejected, baseState } from 'redux/utils';
import {
  ADD_NEW_BLOG,
  GET_BLOGS,
  GET_BLOG,
  UPDATE_BLOG,
  RESET_UPDATE_BLOG
} from 'redux/actions/actionTypes';

export const blogAddReducer = (state = baseState('blog', {}), action) => {
  switch (action.type) {
    case pending(ADD_NEW_BLOG):
      return {
        ...state,
        loading: true,
        loaded: false,
        message: ''
      };
    case fulfilled(ADD_NEW_BLOG):
      return {
        ...state,
        loading: false,
        loaded: true,
        blog: action.payload.data.data,
        message: action.payload.data.message
      };
    case rejected(ADD_NEW_BLOG):
    default:
      return {
        ...state,
        loading: false
      };
  }
};
export const blogsGetReducer = (state = baseState('blogs', []), action) => {
  switch (action.type) {
    case pending(GET_BLOGS):
      return {
        ...state,
        loading: false
      };
    case fulfilled(GET_BLOGS):
      return {
        ...state,
        loading: false,
        loaded: true,
        blogs: action.payload.data.data
      };
    case rejected(GET_BLOGS):
    default:
      return {
        ...state,
        loading: false
      };
  }
};

export const blogGetReducer = (state = baseState('blog', {}), action) => {
  switch (action.type) {
    case pending(GET_BLOG):
      return {
        ...state,
        loading: true
      };
    case fulfilled(GET_BLOG):
      return {
        ...state,
        loading: false,
        loaded: true,
        blog: action.payload.data.data
      };
    case rejected(GET_BLOG):
    default:
      return {
        ...state,
        loading: false
      };
  }
};
export const blogEditReducer = (state = baseState('message', ''), action) => {
  switch (action.type) {
    case pending(UPDATE_BLOG):
      return {
        ...state,
        loaded: false,
        loading: true
      };
    case fulfilled(UPDATE_BLOG):
      return {
        ...state,
        loading: false,
        loaded: true,
        message: action.payload.data.message
      };
    case RESET_UPDATE_BLOG:
      return{
        ...state,
        loaded:false
      }
    case rejected(UPDATE_BLOG):
    default:
      return {
        ...state,
        loading: false
      };
  }
};
