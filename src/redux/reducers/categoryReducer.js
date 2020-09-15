import { ADD_CATEGORY, GET_CATEGORIES } from 'redux/actions/actionTypes';
import { pending, fulfilled, rejected, baseState } from 'redux/utils';

export const categoryAddReducer = (
  state = baseState('category', {}),
  action
) => {
  switch (action.type) {
    case pending(ADD_CATEGORY):
      return {
        ...state,
        loading: false,
        loaded: false
      };
    case fulfilled(ADD_CATEGORY):
      return {
        ...state,
        loading: false,
        loaded: true,
        category: action.payload.data.data
      };
    case rejected(ADD_CATEGORY):
    default:
      return {
        ...state,
        loading: false
      };
  }
};
export const categoryGetReducer = (
  state = baseState('categories', []),
  action
) => {
  switch (action.type) {
    case pending(GET_CATEGORIES):
      return {
        ...state,
        loading: false,
        loaded: false
      };
    case fulfilled(GET_CATEGORIES):
      return {
        ...state,
        loading: false,
        loaded: true,
        categories: action.payload.data.data
      };
    case rejected(GET_CATEGORIES):
    default:
      return {
        ...state,
        loading: false
      };
  }
};
