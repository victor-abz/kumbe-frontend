import { store } from 'redux/store';
import { http } from 'utils/http';
import { GET_ANALYTICS } from './actionTypes';

export const getAnalytics = ({ startDate = '2020-10-01', endDate = 'today' }) => {
  let analyticsParams = `startDate=${startDate}&endDate=${endDate}`;
  store.dispatch({
    type: GET_ANALYTICS,
    payload: http.get(`/analytics?${analyticsParams}`)
  });
};
