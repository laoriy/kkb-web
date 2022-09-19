
//下一个子任务
let nextUnitOfWork = null
let wipRoot = null // work in progress
let currentRoot = null // 现在的根节点

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
// function reconcilerChildren(children, node) {
//     for (let i = 0; i < children.length; i++) {
//         const child = children[i]
//         // 遍历，创建元素
//         // 判断children[i]类型。
//         if (Array.isArray(child)) {
//             for (let j = 0; j < child.length; j++) {
//                 render(child[j], node)
//             }
//         } else {
//             render(children[i], node)
//         }
//     }
// }

//---------------fiber
function reconcilerChildren(workInProgressFiber, children) {
    // 构建fiber结构
    // 数组
    // 更新，删除，新增
    let prevSibling = null
    let oldFiber = workInProgressFiber.base && workInProgressFiber.base.child
    for (let i = 0; i < children.length; i++) {
        const child = children[i]
        let newFiber = null
        // todo 比较type key
        newFiber = {
            type: child.type, // 类型，比如function class host 等
            props: child.props,
            node: null,
            base: null, // 存储fiber，便于比较
            parent: workInProgressFiber
        }
        if(oldFiber){
            oldFiber = oldFiber.sibling
        }
        // parent
        // child
        if(i === 0){
            workInProgressFiber.child = newFiber
        } else {
            prevSibling.sibling = newFiber
        }
        prevSibling = newFiber
        // sibling
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
    // const { type, props } = vnode
    // let node

    // if (typeof type === 'function') {
    //     node = type.isReactComponent ? updateClassComponent(vnode) : updateFunctionComponent(vnode)
    // } else if (type === 'TEXT') {
    //     node = document.createTextNode('')
    // } else if (type) {
    //     node = document.createElement(type)
    // } else {
    //     node = document.createDocumentFragment()
    // }
    // updateNode(node, props)
    // reconcilerChildren(props.children, node)
    // return node

    //----------fiber
    const { type, props } = vnode
    let node

    if (type === 'TEXT') {
        node = document.createTextNode('')
    } else if (type) {
        node = document.createElement(type)
    }
    updateNode(node, props)

    return node

}

function render(vnode, container) {
    // console.log('vnode', vnode);

    // // vnode --> node
    // const node = createNode(vnode)
    // // 把node更新到container

    // container.appendChild(node)

    //----------fiber
    wipRoot = {
        node: container,
        props: { children: [vnode] },
        base: currentRoot,
    }
    nextUnitOfWork = wipRoot

}

function updateHostComponent(fiber) {
    if (!fiber.node) {
        fiber.node = createNode(fiber)
    }
    const { children } = fiber.props
    reconcilerChildren(fiber, children)
    console.log(fiber);
}

function performUnitOfWork(fiber) {
    // 执行当前子任务
    updateHostComponent(fiber)
    // 返回下一个子任务
    // 找到下个任务的原则，先找子元素
    if (fiber.child) {
        return fiber.child
    }
    // 如果没有子元素。寻找兄弟元素
    let nextFiber = fiber
    while (nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling
        }
        nextFiber = nextFiber.parent
    }
    return null
}


function workLoop(deadline) {
    // 执行子任务

    // 返回下一个子任务
    while (nextUnitOfWork && deadline.timeRemaining() > 1) {
        // 有下一个子任务，并且当前帧还没结束
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    }

    // 没有子任务
    // 提交

    if (!nextUnitOfWork && wipRoot) {
        // 提交
        // commit
    }
}

requestIdleCallback(workLoop)

export default {
    render
}