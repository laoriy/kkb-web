// import React from "react";
// import ReactDOM from "react-dom";
import React from './lReact'
import ReactDOM from './lReact/ReactDOM'
import "./index.css";
import { Component } from './lReact/Component';


function FunctionComponent({ name }) {
    return <div className="border function">this is FunctionComponent,hello {name}
        <button onClick={() => console.log('123')}>click</button>
    </div>
}

class ClassComponent extends Component {
    render() {
        const { name } = this.props
        return <div className="border function">hello,{name}</div>
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
