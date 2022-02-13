import { App, createSSRApp } from 'vue';
import AppSSR from './AppSSR.vue';
import { createRouter } from '@/router/index.ssr';
import { createWebHistory, Router } from 'vue-router';

// 返回工厂函数
export function createApp(context?: any): {
    app: App;
    router: Router;
} {
    const history = createWebHistory();
    // 1. 创建路由器实例
    const router = createRouter(history);

    // 2. 创建vue实例app
    const app = createSSRApp(AppSSR);

    return {
        app,
        router,
    };
}
