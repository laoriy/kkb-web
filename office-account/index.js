const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser');
const app = new Koa()
const conf = require('./conf')
app.use(bodyParser())
const router = new Router()
app.use(static(__dirname + '/'))
const axios = require('axios')

const wechat = require('co-wechat')
router.all('/wechat', wechat(conf, true).middleware(
    async message => {
        console.log('wechat:', message)
        return 'Hello World ' + message.Content
    }
))

const tokenCache = {
    access_token: '',
    updateTime: Date.now(),
    expires_in: 7200
}

router.get('/getTokens', async ctx => {
    const wxDomain = `https://api.weixin.qq.com`
    const path = `/cgi-bin/token`
    const param = `?grant_type=client_credential&appid=${conf.appid}&secret=${conf.appsecret}`
    const url = wxDomain + path + param
    const res = await axios.get(url)
    Object.assign(tokenCache, res.data, {
        updateTime: Date.now()
    })
    ctx.body = res.data //实际不返回
})

// router.get('/getFollowers',async ctx => {
//     const url = `https://api.weixin.qq.com/cgi-bin/user/get?access_token=${tokenCache.access_token}`
//     const res = await axios.get(url)
//     console.log('getFollowers:',res)
//     ctx.body = res.data
// })
const { ServerToken, ClientToken } = require('./mongoose')

const WechatAPI = require('co-wechat-api')
const api = new WechatAPI(
    conf.appid,
    conf.appsecret,
    // 取Token
    async () => await ServerToken.findOne(),
    // 存Token
    async token => await ServerToken.updateOne({}, token, { upsert: true })
)
router.get('/getFollowers', async ctx => {
    let res = await api.getFollowers()
    res = await api.batchGetUsers(res.data.openid, 'zh_CN')
    ctx.body = res
})

const oAuth = require('co-wechat-oauth')
const oauth = new oAuth(conf.appid, conf.appsecret,
    async function (openid) {
        return await ClientToken.getToken(openid)
    },
    async function (openid, token) {
        return await ClientToken.setToken(openid, token)
    }
)

router.get('/wxAuthorize', async (ctx, next) => {
    const state = ctx.query.id

    // 回调地址
    const { protocol, hostname } = new URL(ctx.href)
    console.log('protocol', protocol, hostname, state);
    const redirect = `${protocol}//${hostname}/wxCallback`
    const scope = 'snsapi_userinfo'
    const url = oauth.getAuthorizeURL(redirect, state, scope)
    console.log('url:' + url);

    ctx.redirect(url)
})


router.get('/wxCallback', async ctx => {
    const code = ctx.query.code
    console.log('getAccessToken...', code);
    const token = await oauth.getAccessToken(code)

    const accessToken = token.data.access_token

    const openid = token.data.openid
    // 增加本地授权
    ctx.redirect('/?openid=' + openid)
})



router.get('/getUser', async ctx => {
    const openid = ctx.query.openid

    console.log('/getUser...');
    const userInfo = await oauth.getUser(openid)
    ctx.body = userInfo
})


router.get('/getJsConfig', async ctx => {
    console.log(ctx.query);
    const res = await api.getJsConfig(ctx.query)
    console.log(res, 'res');
    ctx.body = res
})



app.use(router.routes()); /*启动路由*/
app.use(router.allowedMethods());
app.listen(80, () => {
    console.log('start at 80');
});