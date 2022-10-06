const delay = (data, tick) => new Promise(resolve => {
    setTimeout(() => {
        resolve(data)
    }, tick)
})
// 可复⽤的服务 ⼀个同步，⼀个异步
module.exports = app => ({
    getName() {
        // return delay('jerry', 1000)
        return app.$model.users.findAll() // 添加
    },
    getAge() {
        return 20
    }
});