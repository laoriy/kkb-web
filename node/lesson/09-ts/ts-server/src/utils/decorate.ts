import * as glob from "glob"
import * as Koa from "koa"
import * as  Parameter from 'parameter'
import * as KoaRouter from "@koa/router"

type HttpMethod = "get" | "put" | "del" | "post" | "patch"

type LoadOptions = {
    /**
     * 路由⽂件扩展名，默认值是`.{js,ts}`
     */
    extname?: string
}

type RouteOptions = {
    /**
     * 适⽤于某个请求⽐较特殊，需要单独制定前缀的情形
     */
    prefix?: string
    /**
     * 给当前路由添加⼀个或多个中间件
     */
    middlewares?: Array<Koa.Middleware>
}

const router = new KoaRouter()

export const decorate =
    (
        method: HttpMethod,
        path: string,
        options: RouteOptions,
        router: KoaRouter
    ) =>
    (target, property, descriptor) => {
        const url = options.prefix ? options.prefix + path : path
        // 晚一拍执行，因为方法装饰器优于类装饰器顺序
        process.nextTick(() => {
            // 添加中间件数组
            const middlewares = []
            if (target.middlewares) {
                middlewares.push(...target.middlewares)
            }
            if (options.middlewares) {
                middlewares.push(...options.middlewares)
            }
            middlewares.push(target[property])
            router[method](url, ...middlewares)
        })
    }

export const method =
    (method: HttpMethod) =>
    (path: string, options: RouteOptions = {}) =>
        decorate(method, path, options, router)

export const get = method("get")
export const post = method("post")
export const del = method("del")
export const put = method("put")
export const patch = method("patch")

export const load = (folder: string, options: LoadOptions = {}) => {
    const extname = options.extname || ".{js,ts}"
    glob.sync(
        require("path").join(folder, `./**/*${extname}`).replace(/\\/g, "/")
    ).forEach((file) => require(file))
    return router
}

export function middlewares(middlewares: Koa.Middleware[]) {
    return function (target) {
        target.prototype.middlewares = middlewares
    }
}

const validateRule = paramPart => rule => {
    return function (target, name, descriptor) {
        const oldValue = descriptor.value
        descriptor.value = function () {
            const ctx = arguments[0]
            const p = new Parameter()
            const data = ctx[paramPart]
            const errors = p.validate(rule, data)
            console.log('error',errors)
            if (errors) throw new Error(JSON.stringify(errors))
            return oldValue.apply(null, arguments);
        }
        return descriptor;
    }
}

export const querystring = validateRule('query')
export const body = validateRule('body')
