const env = "develop";

const baseApi = {
  // 开发版
  develop: "http://127.0.0.1:8080",

  // 体验版
  trial: "http://127.0.0.1:8080",

  // 正式版
  release: "http://127.0.0.1:8080"
}

// 请求路径
export const BASE_URL = baseApi[env] + "/api";

// 默认登录页
export const LOGIN_URL = "/pages/home/index";

// 本地缓存名字
export const tokenStorage = "userToken";
export const userInfoStorage = "userInfo";
export const locationStorage = "userLocation";

// 腾讯地图Key
export const tencentMapKey = "DJJBZ-2TPHD-SXG44-H7VE2-2VRUT-ICBUU";