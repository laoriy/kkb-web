import * as Koa from "koa"
import * as bodify from "koa-body"
import * as serve from "koa-static"
import { load } from "./utils/decorate"
import { resolve } from "path"
import { Sequelize } from "sequelize-typescript"

const database = new Sequelize({
    port: 3306,
    database: "test1",
    dialect: "mysql",
    username: "root",
    password: "laor1220",
    models: [`${__dirname}/model`],
})
database.sync({ force: true })
const router = load(resolve(__dirname, "./routes"))
const app = new Koa()

app.use(serve(`${__dirname}/public`))
app.use(
    bodify({
        multipart: true,
        // 使用非严格模式，允许delete
        strict: false,
    })
)

app.use(router.routes())

app.listen(3000, () => {
    console.log("服务器启动")
})
