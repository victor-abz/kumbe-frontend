import { ADD_NEW_TAG, GET_TAGS } from 'redux/actions/actionTypes';
import { pending, fulfilled, rejected, baseState } from 'redux/utils';

const initialState = baseState('tag', {});
const tagsState = baseState('tags', []);

export const tagAddReducer = (state = initialState, action) => {
  switch (action.type) {
    case pending(ADD_NEW_TAG):
      return {
        ...state,
        loaded: false,
        loading: true
      };
    case fulfilled(ADD_NEW_TAG):
      return {
        ...state,
        loading: false,
        loaded: true,
        tag: action.payload.data.data
      };
    case rejected(ADD_NEW_TAG):
    default:
      return {
        ...state,
        loaded: false,
        loading: false
      };
  }
};
export const tagGetReducer = (state = tagsState, action) => {
  switch (action.type) {
    case pending(GET_TAGS):
      return {
        ...state,
        loading: true
      };
    case fulfilled(GET_TAGS):
      return {
        ...state,
        loading: false,
        loaded: true,
        tags: action.payload.data.data
      };
    case rejected(GET_TAGS):
    default:
      return {
        ...state,
        loading: false
      };
  }
};
