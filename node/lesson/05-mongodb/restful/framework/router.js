const Router = require('koa-router')
const router = new Router()
const { init, get, del, create, list, update } = require('./api')

router.get('/api/:list/:id', init, get)
router.get('/api/:list', init, list)
router.post('/api/:list', init, create)
router.put('/api/:list/:id', init, update)
router.delete('/api/:list/:id', init, del)

module.exports = router.routes()
