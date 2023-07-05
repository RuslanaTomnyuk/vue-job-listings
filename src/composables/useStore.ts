import { useStore as useVuexStore } from 'vuex';
import { key } from '@/store';

export const useStore = () => {
  return useVuexStore(key)
}
