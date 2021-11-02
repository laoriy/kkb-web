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
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: About,
    },
];

const router = createRouter({
    // history: createWebHistory(),
    routes, // `routes: routes` 的缩写
});

export default router;
