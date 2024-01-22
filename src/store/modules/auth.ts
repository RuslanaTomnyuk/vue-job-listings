import { RootStoreState } from '@/store/modules/index.ts';
import { Module } from 'vuex';

export interface AuthStoreState {
  authenticated: false;
}

const auth: Module<AuthStoreState, RootStoreState> = {
  state: () => ({
    authenticated: false,
  }),
  getters: {},
  mutations: {
    SET_AUTH: (state: { authenticated: boolean }, auth: boolean) =>
      state.authenticated = auth,
  },
  actions: {
    setAuth: ({ commit }, auth: boolean) => {
      commit('SET_AUTH', auth)
    }
  },
};

export default auth;
