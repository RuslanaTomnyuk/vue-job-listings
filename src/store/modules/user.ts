import { RootStoreState } from '@/store/modules/index.ts';
import { Module } from 'vuex';

export interface UserStoreState {
  user: null;
}

const user: Module<UserStoreState, RootStoreState> = {
  state: () => ({
    user: null,
  }),
  getters: {
    user: (state) => state.user,
  },
  mutations: {
    SET_USER: (state, user) => (state.user = user),
  },
  actions: {
    user: (context, user) => context.commit('SET_USER', user),
  },
};

export default user;
