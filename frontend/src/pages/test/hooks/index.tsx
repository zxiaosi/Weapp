import { View } from "@tarojs/components";
import Taro, { useDidHide, useDidShow, useLoad, useReady, useUnload } from "@tarojs/taro";
import { useEffect, useState } from "react";

definePageConfig({
  navigationBarTitleText: "Hooks",
});

export default function HookTest() {
  const [temp, setTemp] = useState(0);

  // ---------- React 官方内置 Hook ~ Start ----------

  // useEffect(() => {
  //   console.log("useEffect", temp);
  // }, []);

  // ---------- React 官方内置 Hook ~ end ----------

  // ---------- Taro 官方内置 Hook ~ Start ----------

  useLoad(() => { console.log("componentWillMount", temp); });

  useDidShow(() => { console.log("componentDidShow"); });

  useReady(() => { console.log("componentDidMount", temp + 1); });

  useDidHide(() => { console.log('componentDidHide'); });

  useUnload(() => { console.log("componentWillUnmount"); });

  // ---------- Taro 官方内置 Hook ~ end ----------

  return <View>Hook测试</View>;
}
