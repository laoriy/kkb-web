import { PLACEMENT, UPDATE } from "./constants"

//下一个子任务
let nextUnitOfWork = null
let wipRoot = null // work in progress
let currentRoot = null // 现在的根节点
let wipFiber = null // 当前正在工作的fiber
let hookIndex = null

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

// 构建fiber结构，遍历workInprogressFiber的节点
function reconcilerChildren(workInProgressFiber, children) {
    // 构建fiber结构
    // 数组
    // 更新，删除，新增
    let prevSibling = null
    let oldFiber = workInProgressFiber.base && workInProgressFiber.base.child
    for (let i = 0; i < children.length; i++) {
        const child = children[i]

        let newFiber = null
        const sameType = child && oldFiber && child.type === oldFiber.type
        if (sameType) { // 复用
            newFiber = {
                type: oldFiber.type, // 类型，比如function class host 等
                props: child.props,
                node: oldFiber.node,
                base: oldFiber, // 存储fiber，便于比较
                parent: workInProgressFiber,
                effectTag: UPDATE
            }
        }
        if (!sameType && child) {
            newFiber = {
                type: child.type, // 类型，比如function class host 等
                props: child.props,
                node: null,
                base: null, // 存储fiber，便于比较
                parent: workInProgressFiber,
                effectTag: PLACEMENT
            }
        }

        if (!sameType && oldFiber) {

        }

        if (oldFiber) {
            oldFiber = oldFiber.sibling
        }
        // parent
        // child
        if (i === 0) {
            workInProgressFiber.child = newFiber
        } else {
            prevSibling.sibling = newFiber
        }
        prevSibling = newFiber
        // sibling


    }
}

function updateFunctionComponent(fiber) {
    wipFiber = fiber
    wipFiber.hooks = []
    hookIndex = 0
    const { type, props } = fiber
    const children = [type(props)]
    reconcilerChildren(fiber, children)
}

function updateClassComponent(fiber) {
    const { type, props } = fiber
    const cmmp = new type(props)
    const children = [cmmp.render()]
    reconcilerChildren(fiber, children)
}

function createNode(vnode) {
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

// 初始化
function render(vnode, container) {
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
    reconcilerChildren(fiber, children.flat()) //如果children的子元素仍是数组就要拍平
}
function updateFragmentComponent(fiber) {
    const { children } = fiber.props
    reconcilerChildren(fiber, children)
}


function performUnitOfWork(fiber) {
    // 执行当前子任务
    const { type } = fiber
    if (typeof type === 'function') {
        type.isReactComponent ?
            updateClassComponent(fiber) :
            updateFunctionComponent(fiber)
    } else if (type) {
        updateHostComponent(fiber)
    } else {
        updateFragmentComponent(fiber)
    }
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
function commitWorker(fiber) {
    if (!fiber) return
    // 向上查找
    let parentNodeFiber = fiber.parent
    while (!parentNodeFiber.node) {
        parentNodeFiber = parentNodeFiber.parent

    }

    const parentNode = parentNodeFiber.node
    if (fiber.effectTag === PLACEMENT && fiber.node !== null) {
        parentNode.appendChild(fiber.node)
    } else if (fiber.effectTag === UPDATE && fiber.node !== null) {
        updateNode(fiber.node, fiber.props)
    }

    commitWorker(fiber.child)
    commitWorker(fiber.sibling)
}

function commitRoot() {
    commitWorker(wipRoot.child)
    currentRoot = wipRoot
    wipRoot = null
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
        commitRoot()
    }
    requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)

export function useState(init) {
    const oldHook = wipFiber.base && wipFiber.base.hooks[hookIndex]
    const hook = {
        state: oldHook ? oldHook.state : init,
        queue: [],
    }
    const actions = oldHook ? oldHook.queue : []
    actions.forEach(action => {
        hook.state = action
    })
    const setState = action => {
        hook.queue.push(action)
        wipRoot = {
            node: currentRoot.node,
            props: currentRoot.props,
            base: currentRoot
        }
        nextUnitOfWork = wipRoot
    }
    wipFiber.hooks.push(hook)
    hookIndex++
    return [hook.state, setState]
}

export default {
    render
}