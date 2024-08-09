import axiosClient from '@/configs/axios/axiosClient.ts';
import store from '@/store';

const getUser = async () => {
  try {
    const response = await axiosClient.get('/user', {
      withCredentials: true,
    });

    await store.dispatch('setAuth', true);

    return response?.data;
  } catch (error: any) {
    await store.dispatch('setAuth', false);
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user-data');
    delete axiosClient.defaults.headers.common['Authorization'];
    console.log('Error getting user', error);
  }
};

export default getUser;
