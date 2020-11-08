import {
  CREATE_PARTNER,
  DELETE_PARTNER,
  GET_PARTNERS
} from 'redux/actions/actionTypes';
import { baseState, fulfilled, pending, rejected } from 'redux/utils';

export const partnersGetReducer = (
  state = baseState('partners', []),
  action
) => {
  switch (action.type) {
    case pending(GET_PARTNERS):
      return {
        ...state,
        loaded: false,
        loading: true
      };
    case fulfilled(GET_PARTNERS):
      return {
        ...state,
        loading: false,
        loaded: true,
        partners: action.payload.data.data,
        totalItems: action.payload.data.totalItems
      };
    case rejected(GET_PARTNERS):
    default:
      return {
        ...state,
        loading: false
      };
  }
};
export const partnerAddReducer = (state = baseState('partner', {}), action) => {
  switch (action.type) {
    case pending(CREATE_PARTNER):
      return {
        ...state,
        loaded: false,
        loading: true
      };
    case fulfilled(CREATE_PARTNER):
      return {
        ...state,
        loading: false,
        loaded: true,
        partner: action.payload.data.data
      };
    case rejected(CREATE_PARTNER):
    default:
      return {
        ...state,
        loading: false
      };
  }
};

export const partnerDeleteReducer = (
  state = baseState('message', ''),
  action
) => {
  switch (action.type) {
    case pending(DELETE_PARTNER):
      return {
        ...state,
        loaded: false,
        loading: true
      };
    case fulfilled(DELETE_PARTNER):
      return {
        ...state,
        loading: false,
        loaded: true,
        message: action.payload.data.message
      };
    case rejected(DELETE_PARTNER):
    default:
      return {
        ...state,
        loading: false
      };
  }
};
