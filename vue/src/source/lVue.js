


// 数组响应式

// 1. 替换数组原型中的7个方法；
const originProto = Array.prototype;
const arrayProto = Object.create(originProto);


['push', 'pop', 'shift', 'unshift', 'splice', 'reverse', 'sort'].forEach((method) => {
    arrayProto[method] = function () {
        // 原始操作
        originProto[method].apply(this, arguments)
        // 覆盖操作，通知更新
        console.log('数组执行' + method + '操作：');
    }
})

// 对象响应式
function defineReactive(obj, key, val) {
    //递归
    observe(val);
    //创建一个dep和当前的key一一对应
    const dep = new Dep()
    //访问拦截
    Object.defineProperty(obj, key, {
        get() {
            console.log('get：' + key)
            Dep.target && dep.addDep(Dep.target)
            return val
        },
        set(newVal) {
            if (newVal !== val) {
                console.log('set：' + key + ':' + newVal)
            }
            observe(newVal); // 如果传入的新值还是个对象
            val = newVal

            // 通知更新
            dep.notify()
        }
    })
}

function observe(obj) {
    if (typeof obj !== 'object' || obj == null) {
        //希望传入的是obj
        return
    }

    new Observer(obj);

}


function proxy(vm, sourceKey) {
    Object.keys(vm[sourceKey]).forEach((key) => {
        Object.defineProperty(vm, key, {
            get() {
                return vm[sourceKey][key]
            },
            set(newVal) {
                vm[sourceKey][key] = newVal
            }
        })
    })
}




class LVue {
    constructor(options) {
        // 保存选项
        this.$options = options;
        this.$data = options.data;
        // 响应化处理
        observe(this.$data)
        //代理
        proxy(this, '$data')

        new Complier(options.el, this)
    }
}

/**
 * 根据对象的类型决定如何做响应化
 */
class Observer {
    constructor(value) {
        this.value = value
        if (typeof value === 'object') {
            // 判断传入的obj的类型；
            if (Array.isArray(value)) {
                // 覆盖原型，
                value.__proto__ = arrayProto
                //对数组内部的元素进行像响应化
                for (let i = 0; i < value.length; i++) {
                    observe(value[i]);
                }
            } else {
                this.walk()
            }
        }
    }
    // 对象数据类型
    walk() {
        Object.keys(this.value).forEach((key) => {
            defineReactive(this.value, key, this.value[key])
        })
    }

}

// 编译器


function isElement(node) {
    return node.nodeType === 1
}

function isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
}

class Complier {
    //递归遍历dom树
    // 判断节点类型。如果是文本，则判断是否是插值类型
    // 如果是元素，则遍历器属性判断是否是指令或者事件，然后递归子元素
    constructor(el, vm) {
        this.$vm = vm;
        this.$el = document.querySelector(el)

        if (this.$el) {
            this.compile(this.$el)
        }
    }

    compile(el) {
        const childNodes = el.childNodes;
        Array.from(childNodes).forEach(node => {
            // 判断是否是元素
            if (isElement(node)) {
                console.log('编译元素' + node.nodeName)
                this.compileElement(node)
            } else if (isInter(node)) {
                console.log('编译插值绑定' + node.textContent)
                this.compileText(node)
            }

            if (node.childNodes && node.childNodes.length > 0) {
                this.compile(node)
            }
        })
    }

    compileText(node) {
        // node.textContent = this.$vm[RegExp.$1];
        this.update(node, RegExp.$1, 'text');
    }
    compileElement(node) {
        const nodeAttrs = node.attributes;
        Array.from(nodeAttrs).forEach((attr) => {
            // 规定：指令以l-xx="oo"定义
            const attrName = attr.name;//l-xx
            const exp = attr.value;
            if (this.isDirective(attrName)) {
                const dir = attrName.substring(2) // xx
                //执行指令
                this[dir] && this[dir](node, exp)
            }
        })
    }


    update(node, exp, dir) {
        // 指定对应更新函数xxUpdater,初始化
        const fn = this[dir + 'Updater'];
        fn && fn(node, this.$vm[exp])
        // 更新处理，封装一个更新函数，可以更新对应dom元素。
        new Watcher(this.$vm, exp, function (val) {
            fn && fn(node, val)
        })
    }

    textUpdater(node, value) {
        node.textContent = value
    }
    htmlUpdater(node, value) {
        node.innerHTML = value
    }
    isDirective(attr) {
        return attr.indexOf('l-') === 0
    }
    // l-text
    text(node, exp) {
        this.update(node, exp, 'text')
    }
    // l-html
    html(node, exp) {
        this.update(node, exp, 'html')
    }

}

// 观察者watch
class Watcher {
    constructor(vm, key, updateFn) {
        this.vm = vm;
        this.key = key;
        this.updateFn = updateFn
        // Dep.target 静态属性上设置为当前watcher实例
        Dep.target = this;
        this.vm[this.key]; // 读取触发了getter
        Dep.target = null;
    }
    update() {
        this.updateFn.call(this.vm, this.vm[this.key])
    }
}


// Dep: 依赖，管理某个key相关所有的watcher实例。

class Dep {
    constructor() {
        this.deps = []
    }
    addDep(dep) {
        this.deps.push(dep)
    }
    notify() {
        this.deps.forEach((dep) => {
            dep.update()
        })
    }
}