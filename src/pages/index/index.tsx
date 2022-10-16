import { Component, PropsWithChildren } from "react";
import { View, Text } from "@tarojs/components";
import styles from "./index.module.less";

export default class Index extends Component<PropsWithChildren> {
  componentWillMount() { }

  componentDidMount() { }

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
