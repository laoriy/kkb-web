module.exports = app => ({
    index: async ctx => {
        // ctx.body = "⾸⻚CTRL";
        const name = await app.$service.user.getName()
        app.ctx.body = 'ctrl user' + name
    },
    detail: ctx => {
        app.ctx.body = "详情⻚⾯CTRL";
    }
})