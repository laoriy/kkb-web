import { Component, PropsWithChildren } from "react";
import { AtButton } from "taro-ui";
import Taro, { Config } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.scss";

// import Login from "../../components/login/index.weapp";

export default class Index extends Component<PropsWithChildren> {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}
  toAddBook() {
    Taro.navigateTo({
      url: "/pages/book/book"
    });
  }
  toScanImage() {
    Taro.navigateTo({
      url: "/pages/flower/flower"
    });
  }
  render() {
    return (
      <View className="index">
        <AtButton type="primary" onClick={this.toAddBook}>
          添加图书
        </AtButton>
        <AtButton type="primary" onClick={this.toScanImage}>
          智能识图
        </AtButton>
        {/* <Login /> */}
      </View>
    );
  }
}
