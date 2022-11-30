import { Button, Input, View, Image } from '@tarojs/components'
import Taro, { useReady } from '@tarojs/taro';
import { useState } from 'react';
import { decryptPhone, updateUserInfo } from '~/apis';
import { userInfoStorage } from '~/config';
import styles from "./index.module.less";

definePageConfig({
  navigationBarTitleText: "设置"
})

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

export default function Settings() {
  const [userInfo, setUserInfo] = useState({}) as any; // 用户信息
  const [isSubmit, setIsSubmit] = useState(false); // 是否提交

  useReady(() => {
    const userData = Taro.getStorageSync(userInfoStorage) || {};
    setUserInfo(userData);
  })

  /** 获取用户昵称 */
  const getUserName = (e: any) => {
    console.log("getUserName", e.detail, userInfo.name);
    if (userInfo.name !== e.detail.value) {
      handleUserData({ "name": e.detail.value });
    } else {
      setIsSubmit(false);
    }
  }

  /** 获取用户头像 */
  const getUserAvatar = (e: any) => {
    console.log("getUserAvatar---", e.detail);
    /** 这里可以将头像上传到OSS云存储, 这里保存临时链接, 仅作演示 */
    handleUserData({ "avatar": e.detail.avatarUrl });
  }

  /** 获取用户手机号 */
  const getUserPhone = async (e: any) => {
    console.log("getUserPhone---", e.detail);

    if (e.detail.errMsg.indexOf("ok") > -1) {
      const { code, iv, encryptedData } = e.detail;
      const { data: { data } } = await decryptPhone({ code, iv, encryptedData });
      console.log("用户手机号--", data);
      handleUserData({ "phone": data.phoneNumber });
    } else {
      Taro.showToast({ title: '获取手机号需要授权！', icon: 'none' });
    }
  }

  /** 处理用户数据 */
  const handleUserData = (field: any) => {
    setUserInfo({ ...userInfo, ...field });
    setIsSubmit(true);
  }

  /** 加密手机号 */
  const handlePhone = (phone: string) => {
    return phone.replace(phone.substring(3, 7), "****");
  }

  /** 提交信息 */
  const onSubmit = async () => {
    console.log("userInfo", userInfo);
    Taro.setStorageSync(userInfoStorage, userInfo);
    const { name, avatar, phone } = userInfo;
    await updateUserInfo({ name, avatar, phone }, { isShowLoading: true });
    Taro.navigateBack({ delta: 1 });
  }

  return (
    <View className={styles.page}>
      <View className={styles.item}>
        <View className={styles.left}>用户昵称</View>
        <Input
          value={userInfo?.name}
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
          onChooseAvatar={(e) => { getUserAvatar(e) }}
          className={styles.right}
        >
          <Image src={userInfo?.avatar || defaultAvatarUrl} className={styles.picture} />
        </Button>
      </View>

      <View className={styles.item}>
        <View className={styles.left}>用户手机号</View>
        <Button
          openType="getPhoneNumber"
          onGetPhoneNumber={async (e) => { await getUserPhone(e) }}
          className={styles.right}
        >{handlePhone(userInfo?.phone || "12345678901")}</Button>
      </View>

      <Button
        disabled={!isSubmit}
        style={{ opacity: isSubmit ? "1" : "0.4" }}
        className={styles.submit}
        onClick={async () => { await onSubmit(); }}
      >确定</Button>

    </View>
  )
}
