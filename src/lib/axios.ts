import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getItem, removeItem, setItem } from './storage';
import { Alert } from 'react-native';

// ----------------------------------------------------------------------

export type { AxiosRequestConfig, AxiosResponse };

// export const BASE_URI = 'http://192.168.29.18:3010';
export const BASE_URI = 'https://mapi.executehub.com';

const axiosInstance = axios.create({
  baseURL: BASE_URI + '/api/v1',
});

axiosInstance.interceptors.request.use(
  async config => {
    const token = getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error); // ✅ Added return
  },
);

// intercept every response
axiosInstance.interceptors.response.use(
  async response => {
    if (
      response.data?.authenticated == false ||
      response.data?.isUser == false
    ) {
      delete axiosInstance.defaults.headers.common.Authorization;
      removeItem('token');
      removeItem('refreshToken');
      setItem('authenticated', response.data?.authenticated.toString());
      Alert.alert('Session Expired');
    }
    return response;
  },
  async error => {
    // const status = error?.response?.status;
    // const message = error?.response?.data?.message || error.message;

    // ✅ Handle specific status codes
    // switch (status) {
    //   case 401:
    //     delete axiosInstance.defaults.headers.common.Authorization;
    //     removeItem('token');
    //     removeItem('refreshToken');
    //     setItem('authenticated', 'false');
    //     Alert.alert('Session Expired', 'Please log in again.');
    //     break;

    //   case 403:
    //     Alert.alert('Access Denied', 'You do not have permission.');
    //     break;

    //   case 404:
    //     Alert.alert(
    //       'Not Found',
    //       message || 'The requested resource was not found.',
    //     );
    //     break;

    //   case 500:
    //     Alert.alert(
    //       'Server Error',
    //       'Something went wrong. Please try again later.',
    //     );
    //     break;

    //   default:
    //     if (!error.response) {
    //       // Network error / no internet
    //       Alert.alert(
    //         'Network Error',
    //         'Please check your internet connection.',
    //       );
    //     }
    //     break;
    // }

    return Promise.reject(error); // ✅ Added return — prevents unhandled promise crash
  },
);

export default axiosInstance;
