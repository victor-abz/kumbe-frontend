import {
  CREATE_QUESTION,
  CREATE_REPLY,
  GET_QUESTIONS,
  GET_REPLIES
} from 'redux/actions/actionTypes';
import { baseState, fulfilled, pending, rejected } from 'redux/utils';

export const qtnAddReducer = (state = baseState('question', {}), action) => {
  switch (action.type) {
    case pending(CREATE_QUESTION):
      return {
        ...state,
        loaded: false,
        loading: true
      };
    case fulfilled(CREATE_QUESTION):
      return {
        ...state,
        loading: false,
        loaded: true,
        question: action.payload.data.data
      };
    case rejected(CREATE_QUESTION):
    default:
      return {
        ...state,
        loading: false
      };
  }
};
export const qtnsGetReducer = (state = baseState('questions', []), action) => {
  switch (action.type) {
    case pending(GET_QUESTIONS):
      return {
        ...state,
        loaded: false,
        loading: true
      };
    case fulfilled(GET_QUESTIONS):
      return {
        ...state,
        loading: false,
        loaded: true,
        questions: action.payload.data.data
      };
    case rejected(GET_QUESTIONS):
    default:
      return {
        ...state,
        loading: false
      };
  }
};
export const replyAddReducer = (state = baseState('reply', {}), action) => {
  switch (action.type) {
    case pending(CREATE_REPLY):
      return {
        ...state,
        loaded: false,
        loading: true
      };
    case fulfilled(CREATE_REPLY):
      return {
        ...state,
        loading: false,
        loaded: true,
        reply: action.payload.data.data
      };
    case rejected(CREATE_REPLY):
    default:
      return {
        ...state,
        loading: false
      };
  }
};
export const repliesGetReducer = (state = baseState('replies', []), action) => {
  switch (action.type) {
    case pending(GET_REPLIES):
      return {
        ...state,
        loaded: false,
        loading: true
      };
    case fulfilled(GET_REPLIES):
      return {
        ...state,
        loading: false,
        loaded: true,
        replies: action.payload.data.data
      };
    case rejected(GET_REPLIES):
    default:
      return {
        ...state,
        loading: false
      };
  }
};
