import axiosClient from '@/configs/axios/axiosClient';

export const setAuthHeader = (token: string) => {
  if (token) {
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosClient.defaults.headers.common['Authorization'];
  }
};
