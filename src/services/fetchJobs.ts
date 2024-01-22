import axiosClient from '@/configs/axios/axiosClient.ts';

const fetchJobs = async () => {
  try {
    const { data } = await axiosClient.get<JobPosition[] | null>('/job-list');
    return data;
  } catch (error: unknown) {
    throw new Error('Error fetching jobs! Please try again!!!!');
  }
}

export default fetchJobs;
