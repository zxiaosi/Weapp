import { View, Map, Text, Image } from '@tarojs/components';
import Taro, { useDidHide, useDidShow, useLoad, useReady, useUnload } from '@tarojs/taro';
import React, { useRef, useState } from 'react'
import styles from "./index.module.less";
import { locationStorage } from '~/config';
import { pointData } from '~/tempData';
import orientation from "~/images/orientation.png";

definePageConfig({
  navigationBarTitleText: "Map",
});

export default function MyMap() {
  const [location, setLocation] = useState({}) as any;
  const [markers, setMarkers] = useState([]) as any;

  const isClickPoint = useRef(false); // 是否点击了点位
  const [modal, setModal] = useState({
    data: {} as any, // 数据
    isShow: false, // 是否显示
  });

  useLoad(() => {
    console.log("componentWillMount");

    const res = Taro.getStorageSync(locationStorage);
    setLocation(res);
  });

  useDidShow(() => {
    console.log("componentDidShow");

    setMarkers(pointData);
  });

  // useReady(() => { console.log("componentDidMount"); });

  // useDidHide(() => { console.log('componentDidHide'); });

  // useUnload(() => { console.log("componentWillUnmount"); });

  const clickTap = () => {
    console.log("onTap--点击地图时触发");

    if (!isClickPoint.current) setModal({ ...modal, isShow: false });
    isClickPoint.current = false;
  }

  const clickMarkerTap = (e: any) => {
    console.log("onMarkerTap--点击标记点时触发", e.detail.markerId);

    isClickPoint.current = true;
    setModal({ isShow: true, data: markers[e.detail.markerId - 1] });
  }

  const handleUpdated = () => {
    // console.log("onUpdated--在地图渲染更新完成时触发");
  }

  const handleRegionChange = () => {
    // console.log("onUpdated--在地图渲染更新完成时触发");
  }

  const clickLocation = () => {
    clickTap();
    let mapCtx = Taro.createMapContext("myMap");
    mapCtx.moveToLocation(location);
  }

  return (
    <View>
      <Map
        id="myMap"
        className={styles.map}
        longitude={location.longitude}
        latitude={location.latitude}
        showLocation={true}
        markers={markers}
        onTap={() => { clickTap() }}
        onMarkerTap={(e) => { clickMarkerTap(e) }}
        onUpdated={() => { handleUpdated() }}
        onRegionChange={() => { handleRegionChange() }}
      />

      <View className={styles.rightBtn} onClick={() => { clickLocation() }}>
        <Image src={orientation} />
      </View>

      {
        modal.isShow && <View className={styles.modal}>
          <View className={styles.content}>
            <Text />
            <View>{modal.data.title}</View>
          </View>
        </View>
      }
    </View>
  )
}
