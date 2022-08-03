module.exports = {
    // "get /": async ctx => {
    //     ctx.body = "⽤户⾸⻚";
    // },
    // "get /info": ctx => {
    //     ctx.body = "⽤户详情⻚⾯";
    // }
    "get /": async app => {
        const name = await app.$service.user.getName()
        app.ctx.body = '⽤户⾸⻚service' + name
    },
    "get /info": app => {
        const age = app.$service.user.getAge()
        app.ctx.body = '⽤户⾸⻚service' + age
    }
};