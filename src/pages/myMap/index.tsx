import { View, Map } from '@tarojs/components';
import Taro, { useDidHide, useDidShow, useLoad, useReady, useUnload } from '@tarojs/taro';
import React, { useState } from 'react'
import styles from "./index.module.less";
import { locationStorage, tencentMapKey } from '~/config';

definePageConfig({
  navigationBarTitleText: "Map",
});

export default function MyMap() {
  const [location, setLocation] = useState({}) as any;


  useLoad(() => {
    console.log("componentWillMount");

    const res = Taro.getStorageSync(locationStorage);
    setLocation(res);
  });

  useDidShow(() => { console.log("componentDidShow"); });

  useReady(() => { console.log("componentDidMount"); });

  useDidHide(() => { console.log('componentDidHide'); });

  useUnload(() => { console.log("componentWillUnmount"); });

  return (
    <View>
      <Map
        id="myMap"
        className={styles.map}
        longitude={location.longitude}
        latitude={location.latitude}
        subkey={tencentMapKey}
      />
    </View>
  )
}
