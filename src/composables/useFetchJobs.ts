import axios from 'axios';
import { onMounted, ref } from 'vue';
import { BASE_URL } from '../constants/urls.ts';

export function useFetchJobs() {
  const data = ref<JobPosition[] | null>([]);
  const error = ref(null);
  const isLoading = ref(false);

  const fetchData = async (url: string) => {
    isLoading.value = true;

    try {
      const response = await axios.get<JobPosition[] | null>(url);
      data.value = response.data;
    } catch (err: any) {
      error.value = err.message || 'An error occurred! Please try again!';
      console.error('Error fetching jobs:', err);
      throw new Error('Error fetching jobs! Please try again!!!!');
    } finally {
      isLoading.value = false;
    }
  }

  onMounted(async() => {
    await fetchData(BASE_URL); // fetch data from a specific URL
  });

  return { data, error, isLoading };
}
