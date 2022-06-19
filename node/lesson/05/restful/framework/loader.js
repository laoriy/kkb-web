const fs = require('fs')

const path = require('path')

const mongoose = require('mongoose')

function load(dir, cb) {
    // 获取绝对路径

    const url = path.resolve(__dirname, dir)
    const files = fs.readdirSync(url)

    files.forEach(filename => {
        // 去掉后缀
        filename = filename.replace('.js', '')
        const file = require(url + '/' + filename)
        cb(filename, file)
    })
}

const loadModel = config => app => {
    mongoose.connect(config.db.url, config.db.option)
    const conn = mongoose.connection

    conn.on('error', (error) => console.log('数据库连接异常'))

    app.$model = {}

    load('../model', (filename, { schema }) => {
        console.log('load model:' + filename, schema);

        app.$model[filename] = mongoose.model(filename, schema)
    })
}

module.exports = { loadModel }