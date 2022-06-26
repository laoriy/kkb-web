const Loa = require('./loa')
const Router = require('./router')
const app = new Loa()
const static = require('./static')

// 原生Http
// app.use((req, res) => {
//     res.writeHeader(200)
//     res.end('hi loa')

// })

// app.use(ctx => {
//     ctx.body = 'zhe shi ziji fengzhuang de la'
// })


/* middleware */
// const delay = () => new Promise(resolve => setTimeout(() => resolve(), 2000));
// app.use(async (ctx, next) => {
//     ctx.body = "1";
//     await next();
//     ctx.body += "5";
// });
// app.use(async (ctx, next) => {
//     ctx.body += "2";
//     await delay();
//     await next();
//     ctx.body += "4";
// });
// app.use(async (ctx, next) => {
//     ctx.body += "3";
// })

/* router */
const router = new Router();
router.get('/index', async ctx => { ctx.body = 'index page'; });
router.get('/post', async ctx => { ctx.body = 'post page'; });
router.get('/list', async ctx => { ctx.body = 'list page'; });
router.post('/index', async ctx => { ctx.body = 'post page'; });
// 路由实例输出⽗中间件 router.routes()
app.use(router.routes());

/* static */
app.use(static(__dirname + '/public'));


app.listen(3000, () => {
    console.log('listen at 3000...');
})