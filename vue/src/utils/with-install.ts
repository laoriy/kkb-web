import { Plugin, App } from 'vue';
const withInstallFn = <T>(fn: T, name: string): T & Plugin => {
    (fn as T & Plugin).install = function (app: App) {
        app.config.globalProperties[name] = fn;
    };
    return fn as T & Plugin;
};

export default withInstallFn;
