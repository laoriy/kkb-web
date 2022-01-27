import {
    RouteRecordRaw,
    createRouter as _createRouter,
    RouterHistory,
    useRouter as baseUseRouter,
    Router,
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

export function createRouter(history: RouterHistory): Router {
    return _createRouter({
        history,
        routes,
    });
}
