// import React,{Component} from "react";
// import ReactDOM from "react-dom";
import React from './lReact'
// import ReactDOM from './lReact/ReactDOM'
import ReactDOM, { useState } from './lReact/ReactDOMFiber'
import "./index.css";
import { Component } from './lReact/Component';


function FunctionComponent({ name }) {
    const [count, setCount] = useState(0)
    const obj = count % 2 ? {
        className: 'red'
    } : {
        onClick: () => console.log('00--')
    }
    return <div className="border function">this is FunctionComponent,hello {name}
        <div className="green">
            {
                count % 2 === 0 ? <button onClick={() => console.log('omg')}>omg</button> : <div>omg</div>
            }
        </div>

        <div>
            <div {...obj}>oo</div>
            <button onClick={() => setCount(count + 1)}>count-{count}</button>
        </div>
        <button onClick={() => console.log('123')}>click</button>
    </div>
}

class ClassComponent extends Component {
    state = {
        count: 0
    }
    render() {
        const { name } = this.props
        return <div className="border function">hello,{name}
            <p>the count:{this.state.count}</p>
            <button onClick={() => this.setState({ count: this.state.count + 1 })}>add</button>
        </div>
    }
}
const jsx = <div className="border">
    <p>这是一个文本</p>
    <a href="www.baidu.com">这是百度</a>
    <div className="border">
        <h5>hello</h5>
    </div>
    <FunctionComponent name="function" />
    <ClassComponent name="class" />
    <>
        <span>123</span>
        <span>456</span>
    </>
    {[1, 2, 3].map(item => {
        return (<div className="border" key={item}>
            <p>{item}</p>
            <p>item</p>
        </div>)
    })}
</div>


/**
 * element
 * container
 * vnode --> node 渲染更新到container
 */
ReactDOM.render(jsx, document.getElementById("root"));

/**
 * 节点类型
 * 文本类型、html标签节点
 * class component
 * function component
 * fragment
 */

// jsx=>createElement(生成element，就是我们需要的vnode) => render(vnode--> node,再把node渲染到container)
// vnode 生成node的流程注意下区分，不同的节点处理不同
