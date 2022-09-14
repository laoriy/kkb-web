// 更新节点属性，如className,nodeValue等
function updateNode(node, nextVal) {
    Object.keys(nextVal).filter(key => key !== 'children').forEach(key => {
        node[key] = nextVal[key]
    })
}
function reconcilerChildren(children, node) {

    for (let i = 0; i < children.length; i++) {
        // 遍历，创建元素
        render(children[i], node)
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
    } else {
        node = document.createElement(type)
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