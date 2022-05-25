# 入门

### 起步

1. 创建项⽬（cra）： npx create-react-app my-app
2. 打开项⽬： cd my-app
3. 启动项⽬： npm start
4. 暴露配置项： npm run eject

### React 和 ReactDom

- React 负责逻辑控制，数据 -> VDOM
- ReactDom 渲染实际 DOM，VDOM -> DOM
- React 使⽤ JSX 来描述 UI
- babel-loader 把 JSX 编译成相应的 JS 对象，React.createElement 再把这个 JS 对象构造成 React 需
  要的虚拟 dom。

# JSX 语法

### JSX

- JSX 是⼀种 JavaScript 的语法扩展，其格式⽐较像模版语⾔，但事实上完全是在 JavaScript 内部实现的。
- JSX 可以很好地描述 UI，能够有效提⾼开发效率。

### 基本使用

- 表达式{}的使⽤，index.js

  ```jsx
  const name = "react study";
  const jsx = <div>hello, {name}</div>;
  ```

- 函数也是合法表达式，index.js

  ```jsx
  const obj = {
   x fistName: "Harry",
    lastName: "Potter",
  };
  function formatName(name) {
    return name.fistName + " " + name.lastName;
  }
  const jsx = <div>{formatName(user)}</div>;
  ```

- jsx 是 js 对象，也是合法表达式，index.js
  ```jsx
  const greet = <div>good</div>;
  const jsx = <div>{greet}</div>;
  ```
- 条件语句可以基于上⾯结论实现，index.js
  ```jsx
  const show = true; //false;
  const greet = <div>good</div>;
  const jsx = (
    <div>
      {/* 条件语句 */}
      {show ? greet : "登录"}
      {show && greet}
    </div>
  );
  ```
- 数组会被作为⼀组⼦元素对待，数组中存放⼀组 jsx 可⽤于显示列表数据
  ```jsx
  const a = [0, 1, 2];
  const jsx = (
    <div>
      {/* 数组 */}
      <ul>
        {/* diff时候，⾸先⽐较type，然后是key，所以同级同类型元素，key值必须得 唯⼀ */}
        {a.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
  ```

### 属性使用

```jsx
import logo from "./logo.svg";
const jsx = (
  <div>
    {/* 属性：静态值⽤双引号，动态值⽤花括号；class、for等要特殊处理。 */}
    <img src={logo} style={{ width: 100 }} className="img" />
  </div>
);
```

### 模块化 [链接](http://www.ruanyifeng.com/blog/2016/06/css_modules.html)

- css 模块化，创建 index.module.css，index.js

  ```jsx
  import style from "./index.module.css";
  <img className={style.logo} />;
  ```

- 或者 npm install sass -D

  ```jsx
  import style from "./index.module.scss";
  <img className={style.logo} />;
  ```

# 组件

组件，从概念上类似于 JavaScript 函数。它接受任意的⼊参（即 “props”），并返回⽤于描述⻚⾯展示
内容的 React 元素。
组件有两种形式：class 组件和 function 组件。

### class 组件

- class 组件通常拥有状态和⽣命周期，继承于 Component，实现 render ⽅法。

### function 组件

- 函数组件通常⽆状态，仅关注内容展示，返回渲染结果即可。
- 从 React16.8 开始引⼊了 hooks，函数组件也能够拥有状态。
- 提示: 如果你熟悉 React class 的⽣命周期函数，你可以把 useEffect Hook 看做
  componentDidMount ， componentDidUpdate 和 componentWillUnmount 这三个函数的组合。

# 正确使⽤ setState

- 不要直接修改 State
- State 的更新可能是异步的： setState 只有在合成事件和⽣命周期函数中是异步的，在原⽣事件和 setTimeout 中都是同步
  的，这⾥的异步其实是批量更新。
- State 的更新会被合并，如果想要链式更新 state：

  ```js
  //合并
  changeValue = (v) => {
    this.setState({
      counter: this.state.counter + v,
    });
  };
  setCounter = () => {
    this.changeValue(1);
    this.changeValue(2);
  };
  // 链式
  changeValue = (v) => {
    this.setState((state) => ({ counter: state.counter + v }));
  };
  setCounter = () => {
    this.changeValue(1);
    this.changeValue(2);
  };
  ```
