import axios from 'axios';
import { BASE_URL } from '../constants/urls.ts';
import { ref } from 'vue';

const data = ref(null);
const error = ref(null);
const isLoading = ref(false);

export async function getJobs() {
  isLoading.value = true;

  try {
    isLoading.value = true;
    const response = await axios.get(BASE_URL);
    return data.value = response.data;
  } catch (err: any) {
    error.value = err.message || 'An error occurred! Please try again!';
    console.error('Error fetching jobs:', err);
    throw new Error('Error fetching jobs! Please try again!!!!');
  } finally {
    isLoading.value = false;
  }
}
