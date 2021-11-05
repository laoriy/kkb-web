import { App, defineComponent, h, shallowRef, computed, Ref } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import { inject } from 'vue';

type params = {
    routes: RouteRecordRaw[];
};
type Router = {
    install(app: App): void;
    currentRoute: Ref<{
        path: string;
    }>;
    options: {
        routes: RouteRecordRaw[];
    };
    go: (delta: number) => void;
    push: (path: string) => void;
    routerMaps: Record<string, RouteRecordRaw>;
};

const routerKey = Symbol('router');

export function useRouter(): Router {
    return inject(routerKey) as Router;
}
const RouterLink = defineComponent({
    props: {
        to: {
            type: String,
            required: true,
        },
    },
    setup(props, { slots }) {
        return () => {
            return h('a', { href: '#' + props.to }, slots.default?.());
        };
    },
});

const RouterView = defineComponent({
    setup() {
        const router = useRouter();
        const { currentRoute, routerMaps } = router;
        const currentComponent = computed(() => routerMaps[currentRoute.value.path]);

        return () => {
            if (currentComponent.value?.component) {
                return h(currentComponent.value?.component);
            }
        };
    },
});

const START_LOCATION_NORMALIZED = {
    path: '/',
};

function push(path: string) {
    window.location.hash = `#${path}`;
}
function go(delta: number) {
    window.history.go(delta);
}

function redirect(path: string) {
    window.location.replace(path);
}

function initRouterMaps(routes: RouteRecordRaw[]) {
    const maps: Router['routerMaps'] = {};
    routes.forEach((routeItem) => {
        maps[routeItem.path] = routeItem;
    });
    return maps;
}

function onHashChange(router: Router) {
    const { currentRoute } = router;
    const path = window.location.hash.slice(1);
    if (!path) {
        redirect('#/');
        return;
    }
    currentRoute.value = Object.assign({}, currentRoute.value, { path });
}

export function createHashHistory(router: Router): void {
    window.addEventListener('hashchange', onHashChange.bind(null, router));
    window.addEventListener('load', onHashChange.bind(null, router));
}

export function createRouter(options: params): Router {
    const currentRoute = shallowRef(START_LOCATION_NORMALIZED);
    const routerMaps = initRouterMaps(options.routes);
    const router = {
        currentRoute,
        options,
        go,
        push,
        redirect,
        install(app: App) {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const _router = this;
            app.component('RouterLink', RouterLink);
            app.component('RouterView', RouterView);
            app.config.globalProperties.$router = _router;
            app.provide(routerKey, _router);
        },
        routerMaps,
    };
    createHashHistory(router);
    return router;
}
