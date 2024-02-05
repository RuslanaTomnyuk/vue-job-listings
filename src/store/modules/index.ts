import jobs, { JobsStoreState } from './jobs.ts';
import auth, { AuthStoreState } from './auth.ts';
import user, { UserStoreState } from './user.ts';

export interface RootStoreState {
  jobs: JobsStoreState;
  auth: AuthStoreState;
  user: UserStoreState;
}

const storeModules = {
  jobs,
  auth,
  user
};

export default storeModules;
