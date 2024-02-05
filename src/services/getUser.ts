import axiosClient from '@/configs/axios/axiosClient.ts';
import store from '@/store';

const getUser = async () => {
  try {
    const { data } = await axiosClient.get('/user', {
      withCredentials: true,
    });

    await store.dispatch('setAuth', true);

    return data;
  } catch (error: any) {
    await store.dispatch('setAuth', false);
    throw new Error('Error getting user', error);
  }
};

export default getUser;
