(async () => {
    const { MongoClient } = require('mongodb')
    // 创建客户端
    const client = new MongoClient('mongodb://localhost:27017', {

    })

    let ret

    // 创建连接
    ret = await client.connect()
    const db = client.db('test')
    const fruits = db.collection('fruits')

    // 添加文档
    ret = await fruits.insertOne({
        name: '芒果',
        price: 20.1
    })
    console.log('添加文档', JSON.stringify(ret));
    // 查询文档

    ret = await fruits.findOne()
    console.log('查询文档', ret);

    // 更新文档

    ret = await fruits.updateOne({ name: '芒果' }, {
        $set: {
            name: '苹果'
        }
    })
    // 删除

    ret = await fruits.deleteMany()

    client.close()
})()