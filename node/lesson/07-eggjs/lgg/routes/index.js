module.exports = app => ({
    // 'get /': async ctx => {
    //     ctx.body = '⾸⻚'
    // },
    // 'get /detail': ctx => {
    //     ctx.body = '详情⻚⾯'
    // }
    'get /': app.$ctrl.home.index,
    'get /detail': app.$ctrl.home.detail
})