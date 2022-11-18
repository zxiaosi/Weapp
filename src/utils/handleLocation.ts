import Taro from "@tarojs/taro";
import { locationStorage } from "~/config";

type AuthName =
  | "scope.userInfo"
  | "scope.userLocation"
  | "scope.address"
  | "scope.invoiceTitle"
  | "scope.invoice"
  | "scope.werun"
  | "scope.record"
  | "scope.writePhotosAlbum"
  | "scope.camera"
  | "scope.bluetoothBackground";

/**
 * 检查权限
 * @param name 权限名称
 */
export async function checkPermissions(name: AuthName) {
  return new Promise((resolve, reject) => {
    Taro.getSetting({
      success: (res) => {
        resolve(res.authSetting[name] ? true : false);
        // console.info("成功获取权限设置--", res);
      },
      fail: (err) => {
        resolve(false);
        console.error("获取权限设置失败--", err);
      },
    });
  });
}

/**
 * 打开权限
 */
export async function openPermissions(text?: string) {
  Taro.showModal({
    title: "定位失败",
    showCancel: false,
    content: text || "点击【去设置】打开小程序位置授权",
    confirmText: text ? "确定" : "去设置",
    confirmColor: "#FF0000",
    success: async (res) => {

      if (text) { // 手机定位未打开
        Taro.showLoading({ title: "获取用户位置", mask: true });
        await getLocation();
        Taro.hideLoading();
      } else { // 小程序未授权
        Taro.openSetting({
          success: async (res) => {
            await getLocation();
            // console.info("成功打开权限设置--", res);
          },
          fail: (err) => {
            console.error("打开权限设置失败--", err);
          }
        });
      }
    },
  })
}

/**
 * 获取用户定位
 * @param success 成功回调
 */
export async function getLocation(success?: (location: any) => void) {
  let isHasAuth = await checkPermissions("scope.userLocation");
  console.log("是否拥有权限--", isHasAuth);

  if (isHasAuth) {
    Taro.getLocation({
      type: "gcj02", // wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: (res) => {
        console.log("成功获取定位--", res);
        Taro.setStorageSync(locationStorage, res);
        if (success) success(res); // 成功回调
      },
      fail: async (err) => { // 手机定位未打开
        console.log("获取定位失败--", err);
        await openPermissions("请检查手机是否开启定位");
      }
    })
  } else {
    await openPermissions();
  }
}

/**
 * 获取用户定位(临时)
 * @param success 成功回调
 */
export async function getLocationTemp(success?: (location: any) => void) {
  Taro.getLocation({
    type: "gcj02", // wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
    success: (res) => {
      console.log("成功获取定位--", res);
      Taro.setStorageSync(locationStorage, res);
      if (success) success(res); // 成功回调
    },
    fail: async (err) => { // 手机定位未打开
      console.log("获取定位失败--", err);
    }
  })
}