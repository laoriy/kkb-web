import * as Koa from "koa"
import { get, middlewares, post, querystring } from "../utils/decorate"
import model from "../model/user"

const users = [{ name: "tom" }]

// @middlewares([
//     async function guard(ctx: Koa.Context, next: () => Promise<any>) {
//         if (ctx.header.token) {
//             await next()
//         } else {
//             throw "请登录"
//         }
//     },
// ])
export default class User {
    @get("/users")
    @querystring({
        age: { type: 'int', required: false, max: 200, convertType: 'int' },
    })
    public async list(ctx: Koa.Context) {
        const users = await model.findAll()
        ctx.body = { ok: 1, data: users }
    }

    @post("/users", {
        middlewares: [
            async function validation(
                ctx: Koa.Context,
                next: () => Promise<any>
            ) {
                // 用户名必须
                const name = (ctx.request as any).body.name
                if (!name) {
                    throw "请输入用户名"
                }
                await next()
            },
        ],
    })
    public add(ctx: Koa.Context) {
        users.push((ctx.request as any).body)
        ctx.body = { ok: 1 }
    }
}
