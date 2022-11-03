import Taro from "@tarojs/taro";
import { Component, PropsWithChildren } from "react";
import { View, Text } from "@tarojs/components";
import sign_05_icon_select from "~/images/sign_05_icon_select.png";
import styles from "./index.module.less";
import { getUserList } from "~/apis";

definePageConfig({
  navigationBarTitleText: '首页'
})


export default class Index extends Component<PropsWithChildren> {
  componentWillMount() {
  }

  async componentDidMount() {
    console.log("sign_05_icon_select", sign_05_icon_select);
    
    // const resp = await getUserList();
    // console.log("resp---", resp);
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  temp() {
    Taro.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }

  render() {
    return (
      <View className={styles.page}>
        <Text>Hello world!</Text>

        <View onClick={() => { this.temp() }}>点我</View>
      </View>
    );
  }
}
