import { store } from 'redux/store';
import { http } from 'utils/http';
import { CREATE_PARTNER, DELETE_PARTNER, GET_PARTNERS } from './actionTypes';

export const addPartner = (newPartner = {}) => {
  store.dispatch({
    type: CREATE_PARTNER,
    payload: http.post('/partners', newPartner)
  });
};
export const getPartners = () => {
  store.dispatch({
    type: GET_PARTNERS,
    payload: http.get('/partners')
  });
};
export const deletePartner = partnerId => {
  store.dispatch({
    type: DELETE_PARTNER,
    payload: http.delete(`/partners/${partnerId}`)
  });
};
