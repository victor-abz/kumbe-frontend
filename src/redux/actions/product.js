import { store } from 'redux/store';
import { http } from 'utils/http';
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCTS,
  UPDATE_PRODUCT
} from './actionTypes';

export const addProduct = (newProduct = {}) => {
  store.dispatch({
    type: CREATE_PRODUCT,
    payload: http.post('/products', newProduct)
  });
};
export const editProduct = (productId = '', product = {}) => {
  store.dispatch({
    type: UPDATE_PRODUCT,
    payload: http.patch(`/products/${productId}`, product)
  });
};
export const getProducts = () => {
  store.dispatch({
    type: GET_PRODUCTS,
    payload: http.get('/products')
  });
};
export const deleteProduct = productId => {
  store.dispatch({
    type: DELETE_PRODUCT,
    payload: http.delete(`/products/${productId}`)
  });
};
