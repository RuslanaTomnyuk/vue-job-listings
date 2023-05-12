import { createApp } from 'vue';
import App from '../app.vue';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
  defaults: {
    global: {
      elevation: 0,
    },
  },
});

createApp(App).use(vuetify).mount('#app');
