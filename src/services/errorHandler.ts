import { useToast } from 'vue-toastification';
import { AxiosError } from 'axios';

const toast = useToast();

const errorHandler = (err: AxiosError) => {
  if (err?.response?.status === 401) {
    const errorMessage = err?.response?.data?.message || err.message;
    toast.error(errorMessage);
  } else if (err?.response?.status === 404) {
    toast.error(err?.response?.data?.message || err.message);
  } else {
    console.log('AxiosError', err);
    toast.error('An error occurred. Please try again later.');
  }
};

export default errorHandler;
