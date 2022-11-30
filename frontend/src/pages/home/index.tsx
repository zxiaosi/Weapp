import { Component, PropsWithChildren } from "react";
import { View, Text, Button } from "@tarojs/components";
import styles from "./index.module.less";
import Taro from "@tarojs/taro";
import { getLocation } from "~/utils/handleLocation";
import { getUserInfo } from "~/apis";
import { userInfoStorage } from "~/config";

definePageConfig({
  navigationBarTitleText: "首页",
});

export default class Home extends Component<PropsWithChildren> {
  async componentDidMount() {
    await getLocation(); // 需要appId

    const { data: { data } } = await getUserInfo();
    Taro.setStorageSync(userInfoStorage, data);
    console.log("用户信息--", data);
  }

  pageTo(path: string) {
    switch (path) {
      case "hooks":
      case "map":
      case "mqtt":
      case "settings":
        Taro.navigateTo({ url: `/pages/test/${path}/index` });
        break;
      case "echarts":
        Taro.navigateTo({ url: `/pages/echarts/index` });
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
        <Button onClick={this.pageTo.bind(this, "hooks")}>Hook 测试</Button>
        <Button onClick={this.pageTo.bind(this, "echarts")}>Echarts-For-Weixin 测试</Button>
        <Button onClick={this.pageTo.bind(this, "map")}>Map 测试</Button>
        <Button onClick={this.pageTo.bind(this, "mqtt")}>Mqtt 测试</Button>
        <Button onClick={this.pageTo.bind(this, "settings")}>设置 【获取用户信息】</Button>
      </View>
    );
  }
}
