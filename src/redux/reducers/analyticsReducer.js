import { pending, fulfilled, rejected, baseState } from 'redux/utils';
import { GET_ANALYTICS } from 'redux/actions/actionTypes';

export const analyticsReducer = (
  state = baseState('analytics', []),
  action
) => {
  switch (action.type) {
    case pending(GET_ANALYTICS):
      return {
        ...state,
        loading: true,
        analyticLoading: true
      };
    case fulfilled(GET_ANALYTICS):
      return {
        ...state,
        loading: false,
        loaded: true,
        analytics: action.payload.data.data
      };
    case rejected(GET_ANALYTICS):
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
