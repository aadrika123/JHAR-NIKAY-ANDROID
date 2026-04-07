import { createMMKV } from 'react-native-mmkv';
import axios from './axios';

export const storage = createMMKV();

export const isValidToken = (token: string) => {
  if (!token) {
    return false;
  }
  return true;
};

// ---------------------------------------------------------------------

// ----------------------------------------------------------------------

export const setSession = async (token: string | null) => {
  if (token) {
    storage.set('token', token);
    // axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    storage.remove('token');
    delete axios.defaults.headers.common.Authorization;
  }
};
