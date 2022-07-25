module.exports = app => {
    const { STRING } = app.Sequelize

    const Users = app.model.define(
        'users',
        {
            name: STRING(30),

        },
        { timestamps: false }
    )

    // // 数据库同步

    // Users.sync({ force: true })

    return Users
}