import { store } from 'redux/store';
import { http } from 'utils/http';
import { ADD_CATEGORY, GET_CATEGORIES } from './actionTypes';

export const addCategory = (newCategory = {}) => {
  store.dispatch({
    type: ADD_CATEGORY,
    payload: http.post('/categories', newCategory)
  });
};
export const getCategories = (forSlider = false, type = 'blog') => {
  let categoriesURL = `/categories?categoryType=${type}`;
  if (forSlider) {
    categoriesURL += `&forSlider=forSlider`;
  }
  store.dispatch({
    type: GET_CATEGORIES,
    payload: http.get(categoriesURL)
  });
};
