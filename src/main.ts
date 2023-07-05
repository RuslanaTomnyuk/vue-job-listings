import { createApp } from 'vue';
import App from './app.vue';
import Toast from 'vue-toastification';
import './styles/styles.scss';
import 'vue-toastification/dist/index.css';

import router  from './router/router.ts';
import vuetify from './configs/vuetify.ts';
import store, { key } from './store/index.ts';
import i18n from '@/configs/i18n/i18n.ts';
import { globalErrorHandler } from './services/globalErrorHandler.ts';

const app = createApp(App);

const options = {
  timeout: 1500
}

globalErrorHandler(app);

app
  .use(router)
  .use(store, key)
  .use(i18n)
  .use(vuetify)
  .use(Toast, options)
  .mount('#app')
