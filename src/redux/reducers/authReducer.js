import { pending, fulfilled, rejected, baseState } from 'redux/utils';
import { LOGIN_USER, SET_AUTH_USER } from 'redux/actions/actionTypes';

const initialState = baseState('user', {});
const authState = { loggedIn: false, user: {} };
export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case pending(LOGIN_USER): {
      return {
        ...state,
        loading: true
      };
    }
    case fulfilled(LOGIN_USER): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: action.payload.data.message,
        user: action.payload.data.data
      };
    }
    case rejected(LOGIN_USER):
    default: {
      return state;
    }
  }
};
export const authReducer = (state = authState, action) => {
  switch (action.type) {
    case SET_AUTH_USER:
      return {
        ...state,
        loggedIn: true,
        user: action.payload
      };
    default: {
      return state;
    }
  }
};
