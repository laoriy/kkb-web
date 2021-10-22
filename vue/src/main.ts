import { createApp } from 'vue';
import App from './App.vue';
import Message from '@/components/message';
const app = createApp(App);

app.use(Message);
app.mount('#app');
