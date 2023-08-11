import { useToast } from 'vue-toastification';
import { AxiosError } from 'axios';

const toast = useToast();

const errorHandler = (err: AxiosError) => {
  console.error(err);
  toast.error('An error occurred. Please try again later.');
};

export default errorHandler
