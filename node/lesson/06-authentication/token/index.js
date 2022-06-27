const Koa = require('koa')
const Router = require('@koa/router')
const jwt = require('jsonwebtoken')
const jwtAuth = require('koa-jwt')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')

const secret = 'it is a secret'

const router = new Router()
const app = new Koa()
app.keys = ['some secret']

app.use(static(__dirname + '/'))
app.use(bodyParser())

router.post('/users/login-token', async (ctx) => {
    // 用户名密码
    const { body } = ctx.request
    const userinfo = body.username
    ctx.body = {
        message: '登录成功',
        user: userinfo,
        token: jwt.sign({
            data: userinfo,
            exp: Math.floor(Date.now() / 1000) + 60 * 60
        }, secret)
    }
})

router.get('/users/getUser-token', jwtAuth({ secret }), async ctx => {
    console.log(ctx.state.user);
    ctx.body = {
        message: '获取成功', userinfo: ctx.state.user.data
    }
})

app.use(router.routes())

app.listen(3000)