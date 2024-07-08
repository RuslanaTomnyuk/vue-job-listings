import store from '@/store';
import axiosClient from '@/configs/axios/axiosClient.ts';
import { storeAccessToken } from '@/helpers/storeAccessToken';

const loginUser = async (email: string, password: string) => {
  try {
    const response = await axiosClient.post(
      '/auth/login',
      { email, password },
      {
        withCredentials: true,
      }
    );

    if (response?.data?.status === 200) {
      storeAccessToken(response?.data.accessToken);
      localStorage.setItem(
        'user-data',
        JSON.stringify(response?.data?.userData)
      );

      await store.dispatch('user', response?.data?.userData);
      await store.dispatch('setAuth', true);
    }
  } catch (error: any) {
    await store.dispatch('setAuth', false);
    console.log('Error logging user', error);
  }
};

export default loginUser;
