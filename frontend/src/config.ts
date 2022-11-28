import { getSystemEnv } from "./utils";

export const env = getSystemEnv();

const baseApi = {
  develop: "http://127.0.0.1:8080", // 开发版
  trial: "http://127.0.0.1:8080", // 体验版
  release: "http://127.0.0.1:8080", // 正式版
}

// 请求路径
export const BASE_URL = baseApi[env] + "/api";

// 默认登录页
export const LOGIN_URL = "/pages/home/index";

// 本地缓存名字
export const tokenStorage = "userToken";
export const userInfoStorage = "userInfo";
export const locationStorage = "userLocation";

// 地图id名(回到当前位置用)
export const mapId = "myMap";