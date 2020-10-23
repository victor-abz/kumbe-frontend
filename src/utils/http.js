import axios from 'axios';
import socketIoClient from 'socket.io-client';
import { AUTH_TOKEN } from './constants';

let token = localStorage.getItem(AUTH_TOKEN);
const language = localStorage.language;

export const http = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/v1`,
  withCredentials: true,
  headers: {
    Authorization: token || '',
    'Accept-Language': language || 'en'
  }
});
export const httpSocket = socketIoClient(process.env.REACT_APP_API_URL, {
  autoConnect: true
});
