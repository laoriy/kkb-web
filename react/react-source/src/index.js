// import React from "react";
// import ReactDOM from "react-dom";
import React from './lReact'
import ReactDOM from './lReact/ReactDOM'
import "./index.css";

const jsx = <div className="border">
    <p>这是一个文本</p>
    <a href="www.baidu.com">这是百度</a>
    <div className="border">
        <h5>hello</h5>
    </div>
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
 */
