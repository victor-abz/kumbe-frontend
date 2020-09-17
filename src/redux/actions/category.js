import { store } from 'redux/store';
import { http } from 'utils/http';
import { ADD_CATEGORY, GET_CATEGORIES } from './actionTypes';

export const addCategory = (newCategory = {}) => {
  store.dispatch({
    type: ADD_CATEGORY,
    payload: http.post('/categories', newCategory)
  });
};
export const getCategories = (type = 'blog') => {
  store.dispatch({
    type: GET_CATEGORIES,
    payload: http.get(`/categories?categoryType=${type}`)
  });
};
