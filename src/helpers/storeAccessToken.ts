import axiosClient from '@/configs/axios/axiosClient';

export const storeAccessToken = (token: string) => {
  try {
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return token;
  } catch (error) {
    console.error('Error retrieving access token:', error);
    return null;
  }
};
