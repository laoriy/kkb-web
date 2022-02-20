import { createApp } from 'vue';
import App from './App.vue';
import Message from '@/components/message';
import router from '@/router/index';
import store, { key } from './store';

const app = createApp(App);

app.use(store, key).use(router).use(Message).mount('#app');
