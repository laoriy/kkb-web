function defineReactive(obj, key, val) {
    observe(val);
    Object.defineProperty(obj, key, {
        get() {
            console.log('get：' + key)
            return val
        },
        set(newVal) {
            if (newVal !== val) {
                console.log('set：' + key + ':' + newVal)
            }
            observe(newVal); // 如果传入的新值还是个对象
            val = newVal
        }
    })
}

function observe(obj) {
    if (typeof obj !== 'object' || obj == null) {
        //希望传入的是obj
        return
    }
    Object.keys(obj).forEach((key) => {
        defineReactive(obj, key, obj[key])
    })
}

const obj = {
    foo: 'foo',
    bar: 'bar',
    baz: { a: 1 }
}
observe(obj)