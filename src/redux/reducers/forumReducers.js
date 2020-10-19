import { CREATE_QUESTION, GET_QUESTIONS } from 'redux/actions/actionTypes';
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
