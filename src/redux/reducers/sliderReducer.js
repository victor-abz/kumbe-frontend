import { CREATE_SLIDER, GET_SLIDERS } from 'redux/actions/actionTypes';
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
