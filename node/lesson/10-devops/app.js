const http = require('http')

const server = http.createServer((request, response) => {
    Math.random() > 0.5 ? aa() : '2'
    response.end('hello ..')
})

if(require.main === module){
    server.listen(3000)
    console.log('server is staring at port 3000');
} else {
    module.exports = server
}