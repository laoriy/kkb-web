import { Component, PropsWithChildren } from "react";
import Taro, { Config } from "@tarojs/taro";

import "taro-ui/dist/style/index.scss"; // 全局引入一次即可
import "./app.scss";

class App extends Component<PropsWithChildren> {
  componentDidMount() {
    if (process.env.TARO_ENV === "weapp") {
      Taro.cloud.init();
    }
  }

  componentDidShow() {}

  componentDidHide() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children;
  }
}

export default App;
