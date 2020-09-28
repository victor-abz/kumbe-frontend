import { ADD_NEW_MEDIA, GET_MEDIAS } from 'redux/actions/actionTypes';
import { baseState, fulfilled, pending, rejected } from 'redux/utils';

export const mediaAddReducer = (state = baseState('message', ''), action) => {
  switch (action.type) {
    case pending(ADD_NEW_MEDIA):
      return {
        ...state,
        loading: true
      };
    case fulfilled(ADD_NEW_MEDIA):
      return {
        ...state,
        loading: false,
        loaded: true,
        message: action.payload.data.message
      };
    case rejected(ADD_NEW_MEDIA):
    default:
      return {
        ...state,
        loading: false
      };
  }
};
export const mediaGetReducer = (state = baseState('medias', []), action) => {
  switch (action.type) {
    case pending(GET_MEDIAS):
      return {
        ...state,
        loading: true
      };
    case fulfilled(GET_MEDIAS):
      return {
        ...state,
        loading: false,
        loaded: true,
        medias: action.payload.data.data
      };
    case rejected(GET_MEDIAS):
    default:
      return {
        ...state,
        loading: false
      };
  }
};
