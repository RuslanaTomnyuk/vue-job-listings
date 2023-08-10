import { RootStoreState } from '@/store/modules/index.ts';
import { Module } from 'vuex';
import { useToast } from 'vue-toastification';

import fetchJobs from '@/services/fetchJobs.ts';

export interface JobsStoreState {
  jobs: JobPosition[];
  error: null;
  isLoading: boolean;
  filters: string[];
}

const toast = useToast();

const jobs: Module<JobsStoreState, RootStoreState> = {
  state: () => ({
    jobs: [],
    error: null,
    isLoading: false,
    filters: []
  }),
  getters: {
    getJobPositionById: (state) => (id: number): JobPosition | undefined => {
      return state.jobs.find((job: JobPosition) => job.id === id)
    },
    filteredJobList: (state) => {
      return state.jobs.filter((position: JobPosition) => {
        const positionFilters: string[] = ([] as any).concat(
          position.role,
          position.level,
          ...position.languages,
          ...position.tools
        );

        return state.filters.every((filter: string) => positionFilters.includes(filter));
      });
    },
  },
  mutations: {
    setPositions(state, jobs: JobPosition[]) {
      state.jobs = jobs;
    },
    setError(state, error) {
      state.error = error;
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    addToFilters(state, jobFilter: string) {
      if (state.filters.includes(jobFilter)) {
        state.filters.filter((btn) => btn !== jobFilter);
      } else {
        state.filters.push(jobFilter);
      }
    },
    removeFromFilters(state, jobFilter: string) {
      if (state.filters.includes(jobFilter)) {

        state.filters = state.filters.filter((btn: string) => btn !== jobFilter);
      }
    },
    clearFilters(state) {
      state.filters = [];
    },
  },
  actions: {
    async fetchJobList({ state, commit }) {
      if (!state.jobs.length) {
        commit('setIsLoading', true);

        try {
          const jobs = await fetchJobs();
          commit('setPositions', jobs);
          toast.success('Successfully fetched jobs!')
        }
        catch (error: unknown) {
          if (error instanceof ReferenceError) {
            error = 'Something went wrong!'
            commit('setError', error);
          }
          console.error(error)

          commit('setError', error);
        }
        finally {
          commit('setIsLoading', false);
        }
      }
    },
    addToFilters({ commit }, jobFilter) {
      commit('addToFilters', jobFilter);
    },
    removeFromFilters({ commit }, jobFilter) {
      commit('removeFromFilters', jobFilter);
    },
    clearFilters({ commit }) {
      commit('clearFilters');
    }
  }
}

export default jobs;
