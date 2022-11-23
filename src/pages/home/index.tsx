import { Component, PropsWithChildren } from "react";
import { View, Text, Button } from "@tarojs/components";
import styles from "./index.module.less";
import Taro from "@tarojs/taro";
import { userInfoStorage } from "~/config";
import avatar from "~/images/avatar.png";
import { getLocation, getLocationTemp } from "~/utils/handleLocation";

definePageConfig({
  navigationBarTitleText: "首页",
});

export default class Home extends Component<PropsWithChildren> {
  async componentDidMount() {
    const userData = {
      id: 1, name: "zzw", sex: 1, avatar: avatar,
      createTime: "2022-10-21 12:23:45", updateTime: "2022-10-21 12:23:46"
    }
    console.log("用户信息--", userData);
    Taro.setStorageSync(userInfoStorage, userData);

    // await getLocation(); // 需要appId
    getLocationTemp(); // 临时获取
  }

  pageTo(path: string) {
    switch (path) {
      case "hooks":
      case "map":
      case "mqtt":
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
      </View>
    );
  }
}
