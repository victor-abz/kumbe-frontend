import {
  ADD_NEW_MEDIA,
  GET_MEDIAS,
  GET_COMICS,
  GET_DID_YOU_KNOW,
  GET_MEDIA_DETAIL,
  UPDATE_MEDIA
} from 'redux/actions/actionTypes';
import { baseState, fulfilled, pending, rejected } from 'redux/utils';

export const mediaAddReducer = (state = baseState('message', ''), action) => {
  switch (action.type) {
    case pending(ADD_NEW_MEDIA):
      return {
        ...state,
        loaded: false,
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
        loaded: false,
        loading: true
      };
    case fulfilled(GET_MEDIAS):
      return {
        ...state,
        loading: false,
        loaded: true,
        medias: action.payload.data.data,
        totalItems: action.payload.data.totalItems
      };
    case rejected(GET_MEDIAS):
    default:
      return {
        ...state,
        loading: false
      };
  }
};

export const comicGetReducer = (state = baseState('comics', []), action) => {
  switch (action.type) {
    case pending(GET_COMICS):
      return {
        ...state,
        loaded: false,
        loading: true
      };
    case fulfilled(GET_COMICS):
      return {
        ...state,
        loading: false,
        loaded: true,
        comics: action.payload.data.data,
        totalItems: action.payload.data.totalItems
      };
    case rejected(GET_COMICS):
    default:
      return {
        ...state,
        loading: false
      };
  }
};
export const dyknowGetReducer = (
  state = baseState('didYouKnow', []),
  action
) => {
  switch (action.type) {
    case pending(GET_DID_YOU_KNOW):
      return {
        ...state,
        loaded: false,
        loading: true
      };
    case fulfilled(GET_DID_YOU_KNOW):
      return {
        ...state,
        loading: false,
        loaded: true,
        didYouKnow: action.payload.data.data,
        totalItems: action.payload.data.totalItems
      };
    case rejected(GET_DID_YOU_KNOW):
    default:
      return {
        ...state,
        loading: false
      };
  }
};
export const mediaEditReducer = (state = baseState('message', ''), action) => {
  switch (action.type) {
    case pending(UPDATE_MEDIA):
      return {
        ...state,
        loaded: false,
        loading: true
      };
    case fulfilled(UPDATE_MEDIA):
      return {
        ...state,
        loading: false,
        loaded: true,
        message: action.payload.data.message
      };
    case rejected(UPDATE_MEDIA):
    default:
      return {
        ...state,
        loading: false
      };
  }
};
export const mediaDetailReducer = (state = baseState('media', {}), action) => {
  switch (action.type) {
    case pending(GET_MEDIA_DETAIL):
      return {
        ...state,
        loaded: false,
        loading: true
      };
    case fulfilled(GET_MEDIA_DETAIL):
      return {
        ...state,
        loading: false,
        loaded: true,
        media: action.payload.data.data
      };
    case rejected(GET_MEDIA_DETAIL):
    default:
      return {
        ...state,
        loading: false
      };
  }
};
