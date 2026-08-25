import axios from 'axios';
import { config } from '../constants/config';
import * as SecureStore from 'expo-secure-store';

export const apiClient = axios.create({
  baseURL: config.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(async (req) => {
  const token = await SecureStore.getItemAsync('auth_token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});
