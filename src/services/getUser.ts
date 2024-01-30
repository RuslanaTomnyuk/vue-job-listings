import axiosClient from '@/configs/axios/axiosClient.ts';

const getUser = async () => {
  try {
    const response = await axiosClient.get('/user', {
      withCredentials: true,
    });
    
    return response;
  } catch (error: any) {
    throw new Error('Error getting user', error);
  }
};

export default getUser;
