import axios from 'axios';
import { AUTH_TOKEN } from './constants';

let token = localStorage.getItem(AUTH_TOKEN);

export const http = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  withCredentials: true,
  headers: {
    Authorization: token || ''
  }
});
