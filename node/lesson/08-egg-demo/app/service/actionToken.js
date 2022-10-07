const { Service } = require('egg');

class ActionService extends Service {
    async apply(_id) {
        const { ctx } = this;
        return ctx.app.jwt.sign({
            data: {
                _id,
            },
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7),
        }, ctx.app.config.jwt.secret);
    }
}

module.exports = ActionService;
