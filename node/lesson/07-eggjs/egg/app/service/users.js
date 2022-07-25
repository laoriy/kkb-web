const { Service } = require('egg')

class UserService extends Service {
    async getAll() {
        // return [
        //     {
        //         name: 'Service...'
        //     }
        // ]
        return await this.ctx.model.Users.findAll()
    }
}

module.exports = UserService