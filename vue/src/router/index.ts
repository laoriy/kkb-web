import { createRouter } from './lvue-router';
import { RouteRecordRaw } from 'vue-router';
import Form from '../views/Form.vue';
import About from '../views/About.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Form,
    },
    {
        path: '/about',
        name: 'About',
        component: About,
    },
];

const router = createRouter({
    routes,
});

export default router;
