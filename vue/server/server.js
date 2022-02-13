/* eslint-disable*/
const express = require('express')
const { createSSRApp } = require('vue')
const { renderToString } = require('@vue/server-renderer')
const path = require('path')
const fs = require('fs')
const server = express();

function createApp(buffer) {
    return createSSRApp({
        data() {
            return {
                user: 'John Doe'
            }
        },
        template: buffer.toString()
    })
}


// 处理favicon
const favicon = require('serve-favicon')
server.use(favicon(path.join(__dirname,'../public','favicon.ico')))

server.get('*', async (req, res) => {
    console.log(req.url);
    const template = req.url.substring(1) || 'index'
    const buffer = fs.readFileSync(path.join(__dirname,`../public/${template}.html`))
    const app = createApp(buffer);
    const appContent = await renderToString(app);
    const html = `
        <html>
            <body>
            <h1>My First Heading</h1>
            <div id="app">${appContent}</div>
            </body>
        </html>
    `;
    res.end(html);
})

server.listen(8889, () => {
    console.log('server is run in 8889');
})