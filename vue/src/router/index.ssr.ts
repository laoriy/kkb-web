import {
    RouteRecordRaw,
    createRouter,
    RouterHistory,
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

export default function (history: RouterHistory) {
    return createRouter({
        history,
        routes,
    });
}
