const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const app = new Koa()

const config = require('./config')

const { loadModel } = require('./framework/loader')

loadModel(config)(app)
app.use(bodyParser())
app.use(require('koa-static')(__dirname + '/'))
const restful = require('./framework/router')
app.use(restful)

const port = 3000
app.listen(port, () => {
    console.log('app start at prot:' + port);
})