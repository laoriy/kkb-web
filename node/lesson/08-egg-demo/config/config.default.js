/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1665045222594_2805';

    // add your middleware config here
    config.middleware = ['errorHandle'];

    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
    };
    config.swaggerdoc = {
        dirScanner: './app/controller',
        apiInfo: {
            title: '开课吧接⼝',
            description: '开课吧接⼝ swagger-ui for egg',
            version: '1.0.0',
        },
        schemes: ['http', 'https'],
        consumes: ['application/json'],
        produces: ['application/json'],
        enableSecurity: false,
        // enableValidate: true,
        routerMap: true,
        enable: true,
    };
    config.mongoose = {
        url: 'mongodb://localhost:27017/test',
        options: {
            autoReconnect: true,
            reconnectTries: Number.MAX_VALUE,
            bufferMaxEntries: 0,
        },
    };
    config.jwt = {
        secret: 'Great4-M',
        enable: true, // default is false
        match: /^\/api/, // optional
    };

    return {
        ...config,
        ...userConfig,
    };
};
