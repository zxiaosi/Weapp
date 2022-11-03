import { View } from "@tarojs/components";
import { useEffect } from "react";
import styles from "./index.module.less";
import sign_05_icon_select from "~/images/sign_05_icon_select.png";

definePageConfig({
  navigationBarTitleText: '首页',
  navigationBarTextStyle: "black",
})

export default function Test() {

  useEffect(() => {
    console.log("sign_05_icon_select", sign_05_icon_select);
  }, [])

  return (
    <View>
      测试
    </View>
  )
}