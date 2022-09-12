import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { registerSW } from 'virtual:pwa-register';

// preflight priority
import './index.css';

import router from './router';
import App from './App.vue';

const intervalMS = 60 * 60 * 1000;
registerSW({
  // Periodic Service Worker Updates
  onRegistered(r) {
    r &&
      setInterval(() => {
        r.update();
      }, intervalMS);
  },
  // Prompt for new content refreshing
  onNeedRefresh() {
    console.log('onNeedRefresh');
  },
  onOfflineReady() {
    console.log('onOfflineReady');
  },
});

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);

// access ctrl
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.name !== 'Login' && !token) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

router.isReady().then(() => app.mount('#app'));
