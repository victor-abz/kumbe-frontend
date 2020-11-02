import { store } from 'redux/store';
import { http } from 'utils/http';
import { CREATE_FAQ, DELETE_FAQ, EDIT_FAQ, GET_FAQS } from './actionTypes';

export const getFAQs = () => {
  store.dispatch({
    type: GET_FAQS,
    payload: http.get('/manage/faqs')
  });
};
export const addFAQ = (newFAQ = {}) => {
  store.dispatch({
    type: CREATE_FAQ,
    payload: http.post('/manage/faqs', newFAQ)
  });
};
export const editFAQ = (questionId, fAQContent = {}) => {
  store.dispatch({
    type: EDIT_FAQ,
    payload: http.patch(`/manage/faqs/${questionId}`, fAQContent)
  });
};
export const deleteFAQ = questionId => {
  store.dispatch({
    type: DELETE_FAQ,
    payload: http.delete(`/manage/faqs/${questionId}`)
  });
};
