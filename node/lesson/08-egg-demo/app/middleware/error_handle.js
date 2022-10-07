module.exports = (option, app) => {
    return async function errorHandle(ctx, next) {
        try {
            await next();
        } catch (err) {
            // 触发error事件
            app.emit('error', err, this);

            const status = err.status || 500;
            // 500
            const error = status === 500 && app.config.env === 'prod' ? 'internal Server Error' : err.message;

            ctx.body = {
                code: status,
                error,
            };

            if (status === 422) {
                ctx.body.detail = err.errors;

            }

            ctx.status = 200;
        }
    };
};
