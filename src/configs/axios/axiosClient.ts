import axios from 'axios';
import errorHandler from '@/services/errorHandler';

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000',
});

export const storeAccessToken = (token: string) => {
  try {
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return token;
  } catch (error) {
    console.error('Error retrieving access token:', error);
    return null;
  }
};

let refresh = false;
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401 && !refresh) {
      refresh = true;
      const response = await axiosClient.post(
        '/auth/refresh-token',
        {},
        {
          withCredentials: true,
        }
      );
      console.log('response - axios client', response);

      if (response?.status && response?.status === 403) {
        return response.statusText;
      }

      if (response?.status && response?.status === 200) {
        storeAccessToken(response?.data.accessToken);
        return axiosClient(error.config);
      }
    }
    refresh = false;
    return errorHandler(error);
  }
);

export default axiosClient;
