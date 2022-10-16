import { Component, PropsWithChildren } from "react";
import { View, Text } from "@tarojs/components";
import styles from "./index.module.less";
import { getUserList } from "../../apis";

export default class Index extends Component<PropsWithChildren> {
  componentWillMount() { }

  async componentDidMount() {
    const resp = await getUserList();
    console.log("resp---", resp);
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className={styles.page}>
        <Text>Hello world!</Text>
      </View>
    );
  }
}
