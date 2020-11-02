import { pending, fulfilled, rejected, baseState } from 'redux/utils';
import {
  CREATE_FAQ,
  DELETE_FAQ,
  GET_FAQS,
  EDIT_FAQ
} from 'redux/actions/actionTypes';

export const faqsGetReducer = (state = baseState('faqs', []), action) => {
  switch (action.type) {
    case pending(GET_FAQS):
      return {
        ...state,
        loading: true
      };
    case fulfilled(GET_FAQS):
      return {
        ...state,
        loading: false,
        loaded: true,
        faqs: action.payload.data.data
      };
    case rejected(GET_FAQS):
    default:
      return {
        ...state,
        loading: false
      };
  }
};
export const faqAddReducer = (state = baseState('faq', {}), action) => {
  switch (action.type) {
    case pending(CREATE_FAQ):
      return {
        ...state,
        loaded: false,
        loading: true
      };
    case fulfilled(CREATE_FAQ):
      return {
        ...state,
        loading: false,
        loaded: true,
        faq: action.payload.data.data
      };
    case rejected(CREATE_FAQ):
    default:
      return {
        ...state,
        loading: false
      };
  }
};
export const faqEditReducer = (state = baseState('message', ''), action) => {
  switch (action.type) {
    case pending(EDIT_FAQ):
      return {
        ...state,
        loaded: false,
        loading: true
      };
    case fulfilled(EDIT_FAQ):
      return {
        ...state,
        loading: false,
        loaded: true,
        message: action.payload.data.message
      };
    case rejected(EDIT_FAQ):
    default:
      return {
        ...state,
        loading: false
      };
  }
};
export const faqRmReducer = (state = baseState('message', ''), action) => {
  switch (action.type) {
    case pending(DELETE_FAQ):
      return {
        ...state,
        loaded: false,
        loading: true
      };
    case fulfilled(DELETE_FAQ):
      return {
        ...state,
        loading: false,
        loaded: true,
        message: action.payload.data.message
      };
    case rejected(DELETE_FAQ):
    default:
      return {
        ...state,
        loading: false
      };
  }
};
