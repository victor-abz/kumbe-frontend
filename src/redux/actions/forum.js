import { store } from 'redux/store';
import { http } from 'utils/http';
import {
  CREATE_QUESTION,
  CREATE_REPLY,
  GET_QUESTIONS,
  GET_REPLIES,
  GET_QUESTION
} from './actionTypes';

export const addQuestion = (newQuestion = {}) => {
  store.dispatch({
    type: CREATE_QUESTION,
    payload: http.post('/questions', newQuestion)
  });
};
export const getQuestions = ({
  pageNumber = 1,
  pageSize = 10,
  search = '',
  category = ''
}) => {
  let qtnParams = `category=${category}&search=${search}&pageSize=${pageSize}&page=${pageNumber}`;
  store.dispatch({
    type: GET_QUESTIONS,
    payload: http.get(`/questions?${qtnParams}`)
  });
};
export const getQuestion = ({ questionId = '' }) => {
  store.dispatch({
    type: GET_QUESTION,
    payload: http.get(`/questions/${questionId}`)
  });
};
export const addReply = (questionId, newReply = {}) => {
  store.dispatch({
    type: CREATE_REPLY,
    payload: http.post(`/questions/${questionId}/replies`, newReply)
  });
};
export const getReplies = (questionId, { pageNumber = 1, pageSize = 10 }) => {
  let replyParams = `pageSize=${pageSize}&page=${pageNumber}`;
  store.dispatch({
    type: GET_REPLIES,
    payload: http.get(`/questions/${questionId}/replies?${replyParams}`)
  });
};
