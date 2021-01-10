import { store } from 'redux/store';
import { http } from 'utils/http';
import { CREATE_SLIDER, GET_SLIDERS } from './actionTypes';

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
