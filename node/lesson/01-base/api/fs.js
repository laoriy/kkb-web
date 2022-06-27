const fs = require('fs')
const { promisify } = require('util')
const readFile = promisify(fs.readFile)

/**同步读取 */
// const data = fs.readFileSync('./conf.js')
// console.log(data, data.toString());

/**异步读取 */
// const data = fs.readFile('./conf.js', (err, data) => {
//     if (err) throw err
//     console.log(data.toString());
// })

/**promise */
// process.nextTick(async () => {
//     const data = await readFile('./conf.js')
//     console.log(data.toString());
// })


/**buffer */
const buffer = Buffer.alloc(10)
// console.log(buffer); // <Buffer 00 00 00 00 00 00 00 00 00 00>

const buffer2 = Buffer.from('a')
// console.log(buffer2); // <Buffer 61>

const buffer3 = Buffer.from('中文')
// console.log(buffer3, buffer3.toString()); // <Buffer e4 b8 ad e6 96 87>


const buffer4 = Buffer.concat([buffer2, buffer3])

console.log(buffer4, buffer4.toString());