import {
  ADD_COMMENT,
  APPROVE_COMMENT,
  GET_COMMENTS,
  RESET_ADD_COMMENT
} from 'redux/actions/actionTypes';
import { baseState, fulfilled, pending, rejected } from 'redux/utils';

export const commentGetReducer = (
  state = baseState('comments', []),
  action
) => {
  switch (action.type) {
    case pending(GET_COMMENTS):
      return {
        ...state,
        loaded: false,
        loading: true
      };
    case fulfilled(GET_COMMENTS):
      return {
        ...state,
        loading: false,
        loaded: true,
        comments: action.payload.data.data,
        totalItems: action.payload.data.totalItems
      };
    case rejected(GET_COMMENTS):
    default:
      return {
        ...state,
        loading: false
      };
  }
};
export const commentApproveReducer = (
  state = baseState('message', ''),
  action
) => {
  switch (action.type) {
    case pending(APPROVE_COMMENT):
      return {
        ...state,
        loaded: false,
        loading: true
      };
    case fulfilled(APPROVE_COMMENT):
      return {
        ...state,
        loading: false,
        loaded: true,
        message: action.payload.data.message
      };
    case rejected(APPROVE_COMMENT):
    default:
      return {
        ...state,
        loading: false
      };
  }
};
export const commentAddReducer = (state = baseState('message', ''), action) => {
  switch (action.type) {
    case pending(ADD_COMMENT):
      return {
        ...state,
        loaded: false,
        loading: true
      };
    case fulfilled(ADD_COMMENT):
      return {
        ...state,
        loading: false,
        loaded: true,
        message: action.payload.data.message
      };
    case RESET_ADD_COMMENT:
      return {
        ...state,
        loaded: false
      };
    case rejected(ADD_COMMENT):
    default:
      return {
        ...state,
        loading: false
      };
  }
};
