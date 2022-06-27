const Koa = require('koa')
const Router = require('@koa/router')
const cors = require('@koa/cors')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
const app = new Koa()
const router = new Router()
app.use(cors({
    credentials: true
}))

app.keys = ['some secret']

app.use(static(__dirname + '/'))
app.use(bodyParser())
app.use(session(app))

// 鉴权

app.use((ctx, next) => {
    if (ctx.url.indexOf('login') > -1) {
        next()
    } else {
        if (!ctx.session.userinfo) {
            ctx.body = '登录失败'
        } else {
            next()
        }
    }
})

router.post('/users/login', async ctx => {
    const { body } = ctx.request
    // 用户密码匹配

    // 设置session 
    ctx.session.userinfo = body.username

    ctx.body = {
        message: '登录成功'
    }
})

router.post('/users/logout', async ctx => {
    // 删除userinfo

    delete ctx.session.userinfo
    ctx.body = {
        message: '登出成功'
    }
})

router.get('/users/getUser', async ctx => {
    ctx.body = {
        message: '获取成功',
        userinfo: ctx.session.userinfo
    }
})

app.use(router.routes())

app.listen(3000)