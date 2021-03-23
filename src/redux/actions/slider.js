import { store } from 'redux/store';
import { http } from 'utils/http';
import {
  CREATE_SLIDER,
  GET_SLIDERS,
  EDIT_SLIDER,
  DELETE_SLIDER
} from './actionTypes';

export const createSlider = (newSlider = {}) => {
  store.dispatch({
    type: CREATE_SLIDER,
    payload: http.post('/manage/sliders', newSlider)
  });
};
export const getSliders = () => {
  store.dispatch({
    type: GET_SLIDERS,
    payload: http.get('/manage/sliders')
  });
};
export const editSlider = (sliderBody = {}, sliderId) => {
  store.dispatch({
    type: EDIT_SLIDER,
    payload: http.patch(`/manage/sliders/${sliderId}`, sliderBody)
  });
};
export const deleteSlider = sliderId => {
  store.dispatch({
    type: DELETE_SLIDER,
    payload: http.delete(`/manage/sliders/${sliderId}`)
  });
};
