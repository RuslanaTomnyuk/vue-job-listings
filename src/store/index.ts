import { createStore, Store } from 'vuex'
import { InjectionKey } from 'vue';
import modules, { RootStoreState } from './modules';

export const key: InjectionKey<Store<RootStoreState>> = Symbol()

const store = createStore<RootStoreState>({
  modules,
  strict: import.meta.env.VITE_NODE_ENV !== 'production'
})

export default store;
