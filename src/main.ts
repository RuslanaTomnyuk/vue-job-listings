import { createApp } from 'vue';
import App from './app.vue';
import './styles/styles.scss';

import router  from './router/router.ts';
import vuetify from './configs/vuetify.ts';
// import { setupErrorHandling } from './handlers/errorHandler.ts';

const app = createApp(App);

// setupErrorHandling(app);

app
  .use(router)
  .use(vuetify)
  .mount('#app')
