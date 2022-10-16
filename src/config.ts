const env = "develop";

const baseApi = {
  // 开发版
  develop: "http://127.0.0.1:8080",

  // 体验版
  trial: "http://127.0.0.1:8080",

  // 正式版
  release: "http://127.0.0.1:8080"
}

// request请求baseURL
export const BASE_URL = baseApi[env] + "/api";