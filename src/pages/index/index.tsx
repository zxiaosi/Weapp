import { Component, PropsWithChildren } from "react";
import { View, Text } from "@tarojs/components";
import styles from "./index.module.less";
import { getUserList } from "../../apis";
import Taro from "@tarojs/taro";

export default class Index extends Component<PropsWithChildren> {
  componentWillMount() { }

  async componentDidMount() {
    const resp = await getUserList();
    console.log("resp---", resp);
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
