const { Controller } = require('egg')


class UserController extends Controller {
    async index() {
        const { ctx } = this

        ctx.body = await ctx.service.users.getAll()
    }
}


module.exports = UserController