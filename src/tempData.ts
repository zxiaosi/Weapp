import Taro from "@tarojs/taro";
import { locationStorage } from "./config";
import avatar from "~/images/avatar.png";
import point from "~/images/point.png";

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

/** 用户信息(假数据) */
export const userData = {
  id: 1,
  name: "zzw",
  sex: 1,
  avatar: avatar,
  createTime: "2022-10-21 12:23:45",
  updateTime: "2022-10-21 12:23:46"
}

/** 点位信息(假数据) */
export const pointData = [
  {
    id: 1,
    latitude: handleRandom("lat", 0.005),
    longitude: handleRandom("lng", 0.005),
    title: "测试点位1",
    iconPath: point,
    width: 30,
    height: 30,
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
