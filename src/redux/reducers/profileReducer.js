import { pending, fulfilled, rejected, baseState } from 'redux/utils';
import {
  UPDATE_PROFILE
} from 'redux/actions/actionTypes';

const initialState = baseState('updateProfile', {});

export const updateProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case pending(UPDATE_PROFILE): {
      return {
        ...state,
        loading: true
      };
    }
    case fulfilled(UPDATE_PROFILE): {
      return {
        ...state,
        loading: false,
        loaded: true,
        message: action.payload.data.message
        // user: action.payload.data.data
      };
    }
    case rejected(UPDATE_PROFILE):
    default:
      return {
        ...state,
        loading: false
      };
  }
};