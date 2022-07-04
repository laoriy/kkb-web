const jsonwebtoken = require('jsonwebtoken')
const secret = '123456789'
const opt = {
    secret: 'jwt_secret',
    key: 'user'
}
const user = {
    username: "abc",
    password: '111111'
}

const token = jsonwebtoken.sign({
    data: user,
    exp: Math.floor(Date.now() / 1000) + (60 * 60)
}, secret)

console.log('生成的token:' + token);

console.log('解码：', jsonwebtoken.verify(token, secret, opt));
