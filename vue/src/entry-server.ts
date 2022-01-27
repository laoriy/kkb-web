// 调用工厂函数，创建实例；
import { App } from 'vue';
import { createApp } from './main.ssr';

// 该函数会被express的路由处理函数调用，创建vue实例
export default function(context: any) {
    return new Promise<App>((resolve, reject) => {
        const { app, router } = createApp(context);
        // 显示首屏的处理
        router.push(context.url);
        router
            .isReady()
            .then(() => {
                resolve(app);
            })
            .catch((error) => {
                reject(error);
            });
    });
}