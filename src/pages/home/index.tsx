import { Component, PropsWithChildren } from "react";
import { View, Text, Button } from "@tarojs/components";
import styles from "./index.module.less";
import Taro from "@tarojs/taro";
import { locationStorage } from "~/config";

definePageConfig({
  navigationBarTitleText: "首页",
});

export default class Home extends Component<PropsWithChildren> {
  componentDidMount() {
    Taro.getLocation({
      type: "gcj02", // wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        const { latitude, longitude, speed, accuracy } = res;
        Taro.setStorageSync(locationStorage, { latitude, longitude, speed, accuracy });
        console.log("用户位置信息--", latitude, longitude, speed, accuracy);
      },
    });
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  pageTo(path: string) {
    switch (path) {
      case "hookTest":
        Taro.navigateTo({ url: "/pages/hookTest/index" });
        break;
      case "myEcharts":
        Taro.navigateTo({ url: "/pages/myEcharts/index" });
        break;
      default:
        Taro.showToast({ title: "未知路径！", icon: "none" });
        break;
    }
  }

  render() {
    return (
      <View className={styles.page}>
        <Text>Hello world!</Text>
        <Button onClick={this.pageTo.bind(this, "hookTest")}>Hook 测试</Button>
        <Button onClick={this.pageTo.bind(this, "myEcharts")}>Echarts-For-Weixin</Button>
      </View>
    );
  }
}
