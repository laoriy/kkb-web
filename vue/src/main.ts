import { createApp } from 'vue';
import App from './App.vue';
import Message from '@/components/message';
const app = createApp(App);
import router from '@/router/index';

app.use(router);
app.use(Message);
app.mount('#app');
