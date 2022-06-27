const http = require('http')

const session = {}

http.createServer((req, res) => {
    if (req.url === '/favicon.icon') {
        res.end()
        return
    }
    console.log('cookie', req.headers.cookie)

    // 设置cookie 
    // res.setHeader('Set-cookie', 'cookie1=abc')
    // res.end('hello cookie')

    const sessionKey = 'sid'
    const cookie = req.headers.cookie

    if (cookie && cookie.indexOf(sessionKey) > -1) {
        res.end('come back')
        const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`)
        const sid = pattern.exec(cookie)[1]
        console.log(`session`, sid, session, session[sid]);
    } else {
        const sid = (Math.random() * 9999999).toFixed()
        res.setHeader('Set-cookie', `${sessionKey}=${sid}`)
        session[sid] = { name: 'laowang' }
        res.end('hello')
    }
}).listen(3000)