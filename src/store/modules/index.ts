import jobs, { JobsStoreState } from './jobs.ts';
import auth, { AuthStoreState } from './auth.ts';

export interface RootStoreState {
  jobs: JobsStoreState;
  auth: AuthStoreState;
}

const storeModules = {
  jobs,
  auth,
};

export default storeModules;
