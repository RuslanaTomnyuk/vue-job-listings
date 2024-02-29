import axios from 'axios';
import { storeAccessToken } from '@/helpers/storeAccessToken';
import errorHandler from '@/services/errorHandler';

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000',
});

let refresh = false;
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !refresh) {
      refresh = true;
      const response = await axiosClient.post(
        '/auth/refresh-token',
        {},
        {
          withCredentials: true,
        }
      );

      if (response?.status && response?.status === 403) {
        return response.statusText;
      }

      if (response?.status === 200) {
        storeAccessToken(response.data.accessToken);

        return axiosClient(error.config);
      }
    }
    refresh = false;
    return errorHandler(error);
  }
);

export default axiosClient;
