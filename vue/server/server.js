/* eslint-disable*/
const express = require('express')
const { createSSRApp } = require('vue')
const { renderToString } = require('@vue/server-renderer')

const server = express();

function createApp() {
    return createSSRApp({
        data() {
            return {
                user: 'John Doe'
            }
        },
        template: `<div>Current user is: {{ user }}</div>`
    })
}
server.get('*', async (req, res) => {
    const app = createApp();
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