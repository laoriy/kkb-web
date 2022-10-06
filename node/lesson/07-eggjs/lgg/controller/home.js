module.exports = app => ({
    index: async ctx => {
        // ctx.body = "⾸⻚CTRL";
        // const name = await app.$service.user.getName()
        // app.ctx.body = 'ctrl user' + name

        app.ctx.body = await app.$model.users.findAll()
    },
    detail: ctx => {
        app.ctx.body = "详情⻚⾯CTRL";
    }
})