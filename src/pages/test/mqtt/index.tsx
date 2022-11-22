import { View } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import mqtt from "~/modules/mqtt/mqtt";

definePageConfig({
  navigationBarTitleText: "Mqtt",
});


export default function MqttTest() {

  useLoad(() => {
    console.log("mqtt", mqtt);
  })

  return (
    <View>
      Mqtt 页面
    </View>
  )
}
