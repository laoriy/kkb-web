const conf = require('./conf')

const { EventEmitter } = require('events')

// 客户端

const { MongoClient } = require('mongodb')

class Mongodb {

    constructor(conf) {
        this.conf = conf
        this.emitter = new EventEmitter()
        // 连接
        this.client = new MongoClient(conf.url)
        this.client.connect(err => {
            if (err) throw err
            // 连接成功
            this.emitter.emit('connect')
        })
    }

    /**
     * 返回集合
     */

    col(colName, dbName = conf.dbName) {
        return this.client.db(dbName).collection(colName)
    }
    /**
     * 用于订阅连接事件
     * @param {*} event 
     * @param {*} cb 
     */
    once(event, cb) {
        this.emitter.once(event, cb)
    }
}

module.exports = new Mongodb(conf)