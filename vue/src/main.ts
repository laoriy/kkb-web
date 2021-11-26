import { createApp } from 'vue';
import App from './App.vue';
import Message from '@/components/message';
import router from '@/router/index';
import store from './store';

const app = createApp(App);

app.use(store)
    .use(router)
    .use(Message)
    .mount('#app');
