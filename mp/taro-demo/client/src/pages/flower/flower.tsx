import { Component, PropsWithChildren } from "react";
import Taro, { Config } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtButton } from "taro-ui";
import "./flower.scss";

export default class Flower extends Component<PropsWithChildren> {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}
  doUpload = (type: number) => {
    Taro.chooseMedia({
      mediaType: ["image"],
      sourceType: [type === 1 ? "album" : "camera"],
      success(result) {
        const filePath = result.tempFiles[0].tempFilePath;
        const cloudPath = `images/flower/${Date.now()}${filePath.match(
          /.[^.]+?$/
        )}`;
        Taro.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            Taro.navigateTo({
              url: `/pages/flowerInfo/flowerInfo?fileID=${res.fileID}&imgUrl=${filePath}`
            });
          }
        });
      }
    });
  };
  render() {
    return (
      <View className="flower">
        <AtButton type="primary" onClick={() => this.doUpload(0)}>
          拍照
        </AtButton>
        <AtButton type="primary" onClick={() => this.doUpload(1)}>
          本地相册
        </AtButton>
      </View>
    );
  }
}
