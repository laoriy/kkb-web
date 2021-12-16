// import { createRouter, useRouter as baseUseRouter } from './lvue-router';
import {
    RouteRecordRaw,
    createRouter,
    createWebHistory,
    useRouter as baseUseRouter,
} from 'vue-router';
import Form from '../views/Form.vue';
import About from '../views/About.vue';

export const useRouter = baseUseRouter;

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
    history: createWebHistory(),
    routes,
});

export default router;
