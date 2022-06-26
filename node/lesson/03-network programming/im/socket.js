const net = require('net')

const chatServer = net.createServer()

const clients = []

chatServer.on('connection', client => {
    client.write('Hi!\n')
    clients.push(client)
    client.on('data', (data) => {
        console.log('receive', data.toString());
        clients.forEach(v => {
            v.write(data)
        })
    })
})

chatServer.listen(9000)