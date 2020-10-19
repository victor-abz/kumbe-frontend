import { store } from 'redux/store';
import { http } from 'utils/http';
import { CREATE_QUESTION, GET_QUESTIONS } from './actionTypes';

export const addQuestion = (newQuestion = {}) => {
  store.dispatch({
    type: CREATE_QUESTION,
    payload: http.post('/questions', newQuestion)
  });
};
export const getQuestions = ({
  pageNumber = 1,
  pageSize = 10,
  search = ''
}) => {
  let qtnParams = `search=${search}&pageSize=${pageSize}&page=${pageNumber}`;
  store.dispatch({
    type: GET_QUESTIONS,
    payload: http.get(`/questions?${qtnParams}`)
  });
};
