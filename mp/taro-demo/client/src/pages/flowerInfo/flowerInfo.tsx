import { Component, PropsWithChildren } from "react";
import { AtCard } from "taro-ui";
import Taro, { Config } from "@tarojs/taro";
import { View, Text, Image, Block } from "@tarojs/components";
import "./flowerInfo.scss";

export default class Flowerinfo extends Component<PropsWithChildren> {
  state = {
    imgUrl: "",
    scanList: [] as any[]
  };
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  onLoad(options) {
    const { fileID, imgUrl } = options;
    this.setState({
      imgUrl
    });
    console.log(fileID);

    // 调用百度AI接口，把图片传递给云函数
    Taro.cloud.callFunction({
      name: "baidu-img",
      data: {
        fileID
      },
      success: (res: any) => {
        const { result = [] } = res.result.data;
        this.setState({
          scanList: result
        });
      }
    });
  }

  render() {
    return (
      <View className="flowerInfo">
        <Image className="img" src={this.state.imgUrl} mode="widthFix"></Image>
        <Block>
          {this.state.scanList.map((res, index) => {
            return (
              <AtCard
                title={res.name}
                key={index}
                thumb={res.baike_info.image_url}
              >
                {res.baike_info.description}
              </AtCard>
            );
          })}
        </Block>
      </View>
    );
  }
}
