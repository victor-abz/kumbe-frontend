import { CHANGE_USER_LEVEL, GET_USERS } from 'redux/actions/actionTypes';
import { pending, fulfilled, rejected, baseState } from 'redux/utils';

const usersState = baseState('users', []);

export const usersGetReducer = (state = usersState, action) => {
  switch (action.type) {
    case pending(GET_USERS):
      return {
        ...state,
        loading: true
      };
    case fulfilled(GET_USERS):
      return {
        ...state,
        loading: false,
        loaded: true,
        users: action.payload.data.data,
        totalItems: action.payload.data.totalItems
      };
    case rejected(GET_USERS):
    default:
      return {
        ...state,
        loaded: false,
        loading: false
      };
  }
};
export const lvlChangeReducer = (state = baseState('message', ''), action) => {
  switch (action.type) {
    case pending(CHANGE_USER_LEVEL):
      return {
        ...state,
        loading: true
      };
    case fulfilled(CHANGE_USER_LEVEL):
      return {
        ...state,
        loading: false,
        loaded: true,
        message: action.payload.data.message
      };
    case rejected(CHANGE_USER_LEVEL):
    default:
      return {
        ...state,
        loaded: false,
        loading: false
      };
  }
};
