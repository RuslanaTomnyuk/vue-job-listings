import { useToast } from 'vue-toastification';
import { AxiosError } from 'axios';

const toast = useToast();

const errorHandler = (err: AxiosError) => {
  const errorMessage =
    err?.response?.data?.message ||
    err.message ||
    'An error occurred. Please try again later.';

  if (err?.response?.status === 401) {
    toast.error(errorMessage);
  } else if (err?.response?.status === 404) {
    toast.error(err?.response?.data?.message || err.message);
  } else {
    console.log('AxiosError', err);
    toast.error(errorMessage);
  }
};

export default errorHandler;
