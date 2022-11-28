import { Button, Input, View, Image } from '@tarojs/components'
import Taro, { useReady } from '@tarojs/taro';
import { useState } from 'react';
import { getUserInfo, updatePhone } from '~/apis';
import { userInfoStorage } from '~/config';
import styles from "./index.module.less";

definePageConfig({
  navigationBarTitleText: "设置"
})

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

export default function Settings() {
  const [userInfo, setUserInfo] = useState({}) as any;

  useReady(async () => {
    const userData = Taro.getStorageSync(userInfoStorage) || {};
    const { data } = await getUserInfo();
    console.log("data--", data);
    Object.assign(userData, data);
    setUserInfo(userData);
  })

  const getUserName = async (e: any) => {
    console.log("getUserName---", e.detail);
    handleUserData({ "nickname": e.detail.value });
    setUserInfo({ ...userInfo, "nickname": e.detail.value });
  }

  const getUserAvatar = async (e: any) => {
    console.log("getUserInfo---", e.detail);
    handleUserData({ "avatar": e.detail.avatarUrl });
    setUserInfo({ ...userInfo, "avatar": e.detail.avatar });
  }

  const getUserPhone = async (e: any) => {
    console.log("getUserPhone---", e.detail);

    if (e.detail.errMsg.indexOf("ok") > -1) {
      const { code, iv, encryptedData } = e.detail;
      const { data } = await updatePhone({ code, iv, encryptedData });
      console.log("用户手机号--", data);
    }
  }

  const handleUserData = (field: any) => {
    const userData = Taro.getStorageSync(userInfoStorage) || {};
    Object.assign(userData, field);
    Taro.setStorageSync(userInfoStorage, userData);
  }

  return (
    <View className={styles.page}>
      <View className={styles.item}>
        <View className={styles.left}>用户昵称</View>
        <Input
          value={userInfo?.nickname || "微信用户"}
          type="nickname"
          placeholder="请输入昵称"
          onBlur={(e) => { getUserName(e); }}
          className={styles.right}
        />
      </View>

      <View className={styles.item}>
        <View className={styles.left}>用户头像</View>
        <Button
          openType="chooseAvatar"
          onChooseAvatar={async (e) => { getUserAvatar(e) }}
          className={styles.right}
        >
          <Image src={userInfo?.avatar || defaultAvatarUrl} className={styles.picture} />
        </Button>
      </View>

      <View className={styles.item}>
        <View className={styles.left}>用户手机号</View>
        <Button
          openType="getPhoneNumber"
          onGetPhoneNumber={async (e) => { getUserPhone(e) }}
          className={styles.right}
        >{userInfo?.phone || "获取手机号"}</Button>
      </View>

    </View>
  )
}
