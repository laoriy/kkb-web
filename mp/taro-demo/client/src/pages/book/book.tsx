import { Component, PropsWithChildren } from "react";
import Taro, { Config } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import "./book.scss";

export default class Book extends Component<PropsWithChildren> {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  db = Taro.cloud.database();

  scanCode = () => {
    Taro.scanCode({
      success: data => {
        Taro.cloud.callFunction({
          name: "book",
          data: {
            isbn: data.result
          },
          success: res => {
            const { bookInfo } = res.result as any;

            // 数据库操作
            this.db.collection("book").add({
              data: bookInfo,
              success(ret) {
                Taro.showModal({
                  title: "添加新书信息",
                  content: `${bookInfo.title}添加成功`
                });
              }
            });
          }
        });
      }
    });
  };
  toList() {
    Taro.navigateTo({
      url: "/pages/books/books"
    });
  }
  render() {
    return (
      <View className="book">
        <Button type="primary" onClick={this.scanCode}>
          扫码识别图书
        </Button>
        <Button type="primary" onClick={this.toList}>
          查看列表
        </Button>
      </View>
    );
  }
}
