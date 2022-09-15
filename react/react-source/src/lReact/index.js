function createTextNode(text) {
    return {
        type: 'TEXT',
        props: {
            children: [],
            nodeValue: text
        }
    }
}

/**
 * 接收参数返回vnode
 * @param {*} type 
 * @param {*} props 
 * @param {*} children 
 */
function createElement(type, props, ...children) {
    if(props){
        delete props.__self
        delete props.__source
    }
    return {
        type,
        props: {
            ...props,
            children: children.map(child => typeof child === 'object' ? child : createTextNode(child))
        }
    }
}

export default { createElement }