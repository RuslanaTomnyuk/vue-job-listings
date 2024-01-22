import jobs, { JobsStoreState } from './jobs.ts'
import auth from './auth.ts'

export interface RootStoreState {
  jobs: JobsStoreState;
}

const storeModules = {
  jobs,
  auth
};

export default storeModules;
