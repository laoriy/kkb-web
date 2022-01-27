// 客户端也需要创建vue实例。
import { createApp } from './main.ssr';
const { app, router } = createApp();
router.isReady().then(() => {
    // 挂载激活
    app.mount('#app');
});
