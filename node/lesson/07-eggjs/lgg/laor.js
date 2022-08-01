const koa = require('koa')
const { initRouter } = require('./laor-loader')

class laor {
    constructor(conf) {
        this.$app = new koa(conf)
        this.$router = initRouter()
        this.$app.use(this.$router.routes())
    }

    start(port) {
        this.$app.listen(port, () => {
            console.log('服务器启动端口' + port);
        })
    }
}

module.exports = laor