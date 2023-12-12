import axios from 'axios';
import errorHandler from '@/services/handlerError.ts';

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000'
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    errorHandler(error);
    return Promise.reject(error);
  });

export default axiosClient;
