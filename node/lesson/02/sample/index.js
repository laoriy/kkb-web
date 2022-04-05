const Koa = require('koa');
const app = new Koa()

app.use(async (ctx, next) => {
    const start = new Date().getTime()
    console.log(`start : ${ctx.url}`);
    await next()
    const end = new Date().getTime();
    console.log(`请求${ctx.url},时长 : ${end - start}ms`);
})

app.use(async (ctx, next) => {

    ctx.body = {
        name: 'tom'
    }

    await next()
})




app.listen(3000)