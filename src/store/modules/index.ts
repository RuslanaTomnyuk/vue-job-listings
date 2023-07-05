import jobs, { JobsStoreState } from './jobs.ts'

export interface RootStoreState {
  jobs: JobsStoreState;
}

const storeModules = {
  jobs,
};

export default storeModules;
