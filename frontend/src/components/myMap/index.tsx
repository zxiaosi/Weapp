import { Map } from '@tarojs/components';
import Taro, { useDidShow, useLoad } from '@tarojs/taro';
import { useRef, useState } from 'react'
import styles from "./index.module.less";
import { mapId } from '~/config';
import { getLocation } from '~/utils/handleLocation';

interface Props {
  width?: number | string; // 地图宽度
  height?: number | string; // 地图高度
  pointData: any; // 标记点列表
  onTap?: (res?: any) => any; // 点击地图时触发
  onMarkerTap?: (res?: any) => any; // 点击标记点时触发
  onUpdated?: () => any; // 在地图渲染更新完成时触发
  onRegionChange?: () => any; // 视野发生变化时触发
}

export default function MyMap(props: Props) {
  const { width = "100vw", height = "100vh", pointData, onTap, onMarkerTap, onUpdated, onRegionChange } = props; // 指定默认值

  const [location, setLocation] = useState({}) as any;

  const isClickPoint = useRef(false); // 是否点击了点位

  const getCurrentLocation = async () => {
    const success = (res: any) => { setLocation(res); };
    await getLocation(success); // 需要appId
  }

  useLoad(() => {
    getCurrentLocation()
  });

  useDidShow(() => {
  });

  const clickTap = (e: any) => {
    // console.log("onTap--点击地图时触发", e.detail);
    if (!isClickPoint.current && onTap) onTap(e.detail);
    isClickPoint.current = false;
  }

  const clickMarkerTap = (e: any) => {
    // console.log("onMarkerTap--点击标记点时触发", e.detail);
    isClickPoint.current = true;
    if (onMarkerTap) onMarkerTap(e);
  }

  const handleUpdated = () => {
    // console.log("onUpdated--在地图渲染更新完成时触发");
    if (onUpdated) onUpdated();
  }

  const handleRegionChange = () => {
    // console.log("onRegionChange--视野发生变化时触发");
    if (onRegionChange) onRegionChange();
  }

  return (
    <Map
      id={mapId}
      style={{ width: width, height: height }}
      className={styles.map}
      longitude={location.longitude}
      latitude={location.latitude}
      showLocation={true}
      markers={pointData}
      onTap={(e) => { clickTap(e) }}
      onMarkerTap={(e) => { clickMarkerTap(e) }}
      onUpdated={() => { handleUpdated() }}
      onRegionChange={() => { handleRegionChange() }}
    />
  )
}
