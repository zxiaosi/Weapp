import { Component, PropsWithChildren } from "react";
import { View, Text } from "@tarojs/components";
import styles from "./index.module.less";
import Taro from "@tarojs/taro";

definePageConfig({
  navigationBarTitleText: "首页",
});

export default class Home extends Component<PropsWithChildren> {
  componentDidMount() {
    Taro.getLocation({
      type: "wgs84",
      success: function (res) {
        const { latitude, longitude, speed, accuracy } = res;

        console.log("用户位置信息--", latitude, longitude, speed, accuracy);
      },
    });
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className="index">
        <Text>Hello world!</Text>
      </View>
    );
  }
}
