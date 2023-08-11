import axios from 'axios';
import errorHandler from '@/services/handlerError.ts';

const axiosClient = axios.create({
  baseURL: 'https://gist.githubusercontent.com/TetianaKor/d804200ae8e6af917d3a90cf32753fed/raw/179ac94c9aba684555330c65f9929dd906de5665'
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    errorHandler(error);
    return Promise.reject(error);
  });

export default axiosClient;
