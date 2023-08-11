import axiosClient from '@/configs/axios/axiosClient.ts';

const fetchJobs = async () => {
  try {
    const response = await axiosClient.get<JobPosition[] | null>('/job-list');
    return response.data;
  } catch (error: unknown) {
    throw new Error('Error fetching jobs! Please try again!!!!');
  }
}

export default fetchJobs;
