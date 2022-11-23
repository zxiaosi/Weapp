import { View, Map, Text, Image } from '@tarojs/components';
import Taro, { useDidShow, useLoad } from '@tarojs/taro';
import React, { useRef, useState } from 'react'
import styles from "./index.module.less";
import { locationStorage, mapId } from '~/config';
import orientation from "~/images/orientation.png";
import point from "~/images/point.png";
import MyMap from '~/components/myMap';
import { getLocation, getLocationTemp } from '~/utils/handleLocation';

definePageConfig({
  navigationBarTitleText: "Map",
});

export default function MapTest() {
  const [location, setLocation] = useState({}) as any;
  const [markers, setMarkers] = useState([]) as any;

  const [modal, setModal] = useState({
    data: {} as any, // 数据
    isShow: false, // 是否显示
  });

  useLoad(() => {
    const res = Taro.getStorageSync(locationStorage);
    setLocation(res);
  });

  useDidShow(() => {
    const pointData = [
      {
        id: 1,
        latitude: handleRandom("lat", 0.005),
        longitude: handleRandom("lng", 0.005),
        title: "测试点位1",
        iconPath: point,
        width: 30,
        height: 30,
        callout: { content: "" }, // 取消真机点位上方的气泡
      },
      {
        id: 2,
        latitude: handleRandom("lat", 0.005),
        longitude: handleRandom("lng", 0.005),
        title: "测试点位2",
        iconPath: point,
        width: 30,
        height: 30,
      },
    ]

    setMarkers(pointData);
  });

  const clickTap = (res?: any) => {
    console.log("onTap--点击地图时触发", res);
    setModal({ ...modal, isShow: false });
  }

  const clickMarkerTap = (res: any) => {
    console.log("onMarkerTap--点击标记点时触发", res);
    setModal({ isShow: true, data: markers[res.markerId - 1] });
  }

  const clickLocationBtn = () => {
    // getLocation((res) => setLocation(res));
    getLocationTemp((res) => setLocation(res));
    let mapCtx = Taro.createMapContext(mapId);
    mapCtx.moveToLocation(location);
  }

  const handleRandom = (type: string, multiple: number = 1) => {
    const { longitude, latitude } = Taro.getStorageSync(locationStorage);

    let num = 0;
    switch (type) {
      case "lng":
        num = longitude;
        break
      case "lat":
        num = latitude;
        break
      default:
        num = Number(type);
        break
    }

    return Number(num) + (Math.random() * multiple);
  }

  return (
    <View>
      <MyMap pointData={markers} onTap={(e) => { clickTap(e) }} onMarkerTap={(e) => { clickMarkerTap(e) }} />

      <View className={styles.rightBtn} onClick={() => { clickLocationBtn() }}>
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
