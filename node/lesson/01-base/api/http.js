const http = require('http')
const fs = require('fs')

http.createServer((req, res) => {
    console.log('there is a request');
    // console.log('response', getPrototypeChain(res));
    const { url, method } = req

    if (url === '/' && method === 'GET') {
        fs.readFile('index.html', (err, data) => {
            console.log(err);
            if (err) {
                res.writeHead(500, {
                    'Content-Type': 'text/plain;charset=utf-8'
                })
                res.end('500 服务器错误')
                return
            }
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/html')
            res.end(data)
        })
    } else if (url === '/users' && method === 'GET') {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        })
        res.end(JSON.stringify([{ name: 'laor' }]))
    } else if (method === 'GET' && req.headers.accept.indexOf('image/*') !== -1) {
        // 流
        fs.createReadStream('.' + url).pipe(res)
    }
}).listen(3000)



function getPrototypeChain(obj) {
    const protoChain = []
    while (obj = Object.getPrototypeOf(obj)) {
        protoChain.push(obj)
    }
    return protoChain
}