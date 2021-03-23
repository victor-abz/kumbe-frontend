import {
  CREATE_SLIDER,
  DELETE_SLIDER,
  EDIT_SLIDER,
  GET_SLIDERS
} from 'redux/actions/actionTypes';
import { baseState, fulfilled, pending, rejected } from 'redux/utils';

export const slidersGetReducer = (state = baseState('sliders', []), action) => {
  switch (action.type) {
    case pending(GET_SLIDERS):
      return {
        ...state,
        loaded: false,
        loading: true
      };
    case fulfilled(GET_SLIDERS):
      return {
        ...state,
        loading: false,
        loaded: true,
        sliders: action.payload.data.data
      };
    case rejected(GET_SLIDERS):
    default:
      return {
        ...state,
        loading: false
      };
  }
};
export const sliderAddReducer = (state = baseState('slider', {}), action) => {
  switch (action.type) {
    case pending(CREATE_SLIDER):
      return {
        ...state,
        loaded: false,
        loading: true
      };
    case fulfilled(CREATE_SLIDER):
      return {
        ...state,
        loading: false,
        loaded: true,
        slider: action.payload.data.data
      };
    case rejected(CREATE_SLIDER):
    default:
      return {
        ...state,
        loading: false
      };
  }
};
export const sliderEditReducer = (state = baseState('message', ''), action) => {
  switch (action.type) {
    case pending(EDIT_SLIDER):
      return {
        ...state,
        loaded: false,
        loading: true
      };
    case fulfilled(EDIT_SLIDER):
      return {
        ...state,
        loading: false,
        loaded: true,
        message: action.payload.data.message
      };
    case rejected(EDIT_SLIDER):
    default:
      return {
        ...state,
        loading: false
      };
  }
};
export const sliderRmReducer = (state = baseState('message', ''), action) => {
  switch (action.type) {
    case pending(DELETE_SLIDER):
      return {
        ...state,
        loaded: false,
        loading: true
      };
    case fulfilled(DELETE_SLIDER):
      return {
        ...state,
        loading: false,
        loaded: true,
        message: action.payload.data.message
      };
    case rejected(DELETE_SLIDER):
    default:
      return {
        ...state,
        loading: false
      };
  }
};
