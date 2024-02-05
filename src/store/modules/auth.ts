import { RootStoreState } from '@/store/modules/index.ts';
import { Module } from 'vuex';

export interface AuthStoreState {
  authenticated: boolean;
}

const auth: Module<AuthStoreState, RootStoreState> = {
  state: () => ({
    authenticated: false,
  }),
  getters: { authenticated: (state) => state.authenticated },
  mutations: {
    SET_AUTH: (state, authenticated) => (state.authenticated = authenticated),
  },
  actions: {
    setAuth: (context, authenticated) =>
      context.commit('SET_AUTH', authenticated),
  },
};

export default auth;
