const koa = require('koa')
const { initRouter, initController, initService, loadConfig, initSchedule } = require('./laor-loader')

class laor {
    constructor(conf) {
        this.$app = new koa(conf)
        loadConfig(this)
        initSchedule()
        this.$service = initService(this)
        this.$ctrl = initController(this)
        this.$router = initRouter(this)
        this.$app.use(this.$router.routes())
    }

    start(port) {
        this.$app.listen(port, () => {
            console.log('服务器启动端口' + port);
        })
    }
}

module.exports = laor