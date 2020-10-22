import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCTS,
  UPDATE_PRODUCT
} from 'redux/actions/actionTypes';
import { baseState, fulfilled, pending, rejected } from 'redux/utils';

export const productsGetReducer = (
  state = baseState('products', []),
  action
) => {
  switch (action.type) {
    case pending(GET_PRODUCTS):
      return {
        ...state,
        loaded: false,
        loading: true
      };
    case fulfilled(GET_PRODUCTS):
      return {
        ...state,
        loading: false,
        loaded: true,
        products: action.payload.data.data
      };
    case rejected(GET_PRODUCTS):
    default:
      return {
        ...state,
        loading: false
      };
  }
};
export const productAddReducer = (state = baseState('product', {}), action) => {
  switch (action.type) {
    case pending(CREATE_PRODUCT):
      return {
        ...state,
        loaded: false,
        loading: true
      };
    case fulfilled(CREATE_PRODUCT):
      return {
        ...state,
        loading: false,
        loaded: true,
        product: action.payload.data.data
      };
    case rejected(CREATE_PRODUCT):
    default:
      return {
        ...state,
        loading: false
      };
  }
};
export const productEditReducer = (
  state = baseState('message', ''),
  action
) => {
  switch (action.type) {
    case pending(UPDATE_PRODUCT):
      return {
        ...state,
        loaded: false,
        loading: true
      };
    case fulfilled(UPDATE_PRODUCT):
      return {
        ...state,
        loading: false,
        loaded: true,
        message: action.payload.data.message
      };
    case rejected(UPDATE_PRODUCT):
    default:
      return {
        ...state,
        loading: false
      };
  }
};
export const productDeleteReducer = (
  state = baseState('message', ''),
  action
) => {
  switch (action.type) {
    case pending(DELETE_PRODUCT):
      return {
        ...state,
        loaded: false,
        loading: true
      };
    case fulfilled(DELETE_PRODUCT):
      return {
        ...state,
        loading: false,
        loaded: true,
        message: action.payload.data.message
      };
    case rejected(DELETE_PRODUCT):
    default:
      return {
        ...state,
        loading: false
      };
  }
};
