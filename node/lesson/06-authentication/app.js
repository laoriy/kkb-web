const Koa = require('koa')
const app = new Koa()

const session = require('koa-session')

app.keys = ['some secret']

// 配置
const SESSION_CONFIG = {
    key: "laor:sess",
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    signed: false
}

// 注册

app.use(session(SESSION_CONFIG, app))

// 测试
app.use(ctx => {
    if (ctx.path === '/favicon.ico') return
    // 获取

    let n = ctx.session.count || 0
    //设置
    ctx.session.count = ++n
    ctx.body = `第${n}访问`
})

app.listen(3000)