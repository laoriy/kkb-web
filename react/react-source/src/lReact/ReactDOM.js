// 更新节点属性，如className,nodeValue等
function updateNode(node, nextVal) {
    Object.keys(nextVal).filter(key => key !== 'children').forEach(key => {
        if (key.slice(0, 2) === 'on') {
            // 以on 开头就是事件（源码复杂一些）
            let eventName = key.slice(2).toLowerCase()
            node.addEventListener(eventName, nextVal[key])
        } else {
            node[key] = nextVal[key]
        }

    })
}
function reconcilerChildren(children, node) {
    for (let i = 0; i < children.length; i++) {
        const child = children[i]
        // 遍历，创建元素
        // 判断children[i]类型。
        if (Array.isArray(child)) {
            for (let j = 0; j < child.length; j++) {
                render(child[j], node)
            }
        } else {
            render(children[i], node)
        }
    }
}

function updateFunctionComponent(vnode) {
    const { type, props } = vnode
    const vvnode = type(props)
    const node = createNode(vvnode)
    return node
}
function updateClassComponent(vnode) {
    const { type, props } = vnode
    const cmmp = new type(props)
    const vvnode = cmmp.render()
    const node = createNode(vvnode)
    return node
}

function createNode(vnode) {
    const { type, props } = vnode
    let node

    if (typeof type === 'function') {
        node = type.isReactComponent ? updateClassComponent(vnode) : updateFunctionComponent(vnode)
    } else if (type === 'TEXT') {
        node = document.createTextNode('')
    } else if (type) {
        node = document.createElement(type)
    } else {
        node = document.createDocumentFragment()
    }
    updateNode(node, props)
    reconcilerChildren(props.children, node)
    return node
}

function render(vnode, container) {
    console.log('vnode', vnode);

    // vnode --> node
    const node = createNode(vnode)
    // 把node更新到container

    container.appendChild(node)
}

export default {
    render
}