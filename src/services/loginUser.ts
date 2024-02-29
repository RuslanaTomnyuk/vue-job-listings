import store from '@/store';
import axiosClient from '@/configs/axios/axiosClient.ts';

const loginUser = async (email: string, password: string) => {
  try {
    const { data } = await axiosClient.post(
      '/auth/login',
      { email, password },
      {
        withCredentials: true,
      }
    );

    if (data?.status === 200) {
      localStorage.setItem(
        'user-data',
        JSON.stringify(data?.userData)
      );

      await store.dispatch('user', data?.userData);
      await store.dispatch('setAuth', true);
    }
  } catch (error: any) {
    await store.dispatch('setAuth', false);
    console.log('Error logging user', error);
  }
};

export default loginUser;
