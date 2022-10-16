const env = "develop";

const baseApi = {
  // 开发版
  develop: "https://127.0.0.1:8080",

  // 体验版
  trial: "https://127.0.0.1:8080",

  // 正式版
  release: "https://127.0.0.1:8080"
}

// request请求baseURL
export const apiUrl = baseApi[env] + "/wechat";