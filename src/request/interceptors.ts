import Taro from "@tarojs/taro";
import { LOGIN_URL, tokenStorage, userInfoStorage } from "~/config";
import { post } from ".";
import { showStatus } from "./statusCode";

/**
 * 获取 Token
 */
export async function requestToken() {
  let token = Taro.getStorageSync(userInfoStorage);

  if (!token) {
    let appid = Taro.getAccountInfoSync().miniProgram.appId;
    const { code } = await Taro.login();
    const { data: userInfo } = await post(`user/wxLogin?code=${code}&appId=${appid}`, {}, { isNeedToken: false });
    Taro.setStorageSync(userInfoStorage, userInfo);
    Taro.setStorageSync(tokenStorage, userInfo?.token);
  }

  return token;
}

/**
 * 请求拦截器
 */
async function requestInterceptor(request: Taro.RequestParams) {
  const { header, isNeedToken, isShowLoadig } = request;

  if (isShowLoadig) Taro.showLoading({ title: "加载中", mask: true });

  if (isNeedToken) request.header = { ...header, Authorization: await requestToken() };

  return request;
}

/**
 * 响应拦截器
 */
function responseInterceptor(request: Taro.RequestParams, response: Taro.request.SuccessCallbackResult) {
  const { isShowLoadig, isShowFailToast } = request;

  if (isShowLoadig) Taro.hideLoading();

  const { statusCode, data } = response;

  if (statusCode === 200) { // HTTP 成功
    const { code, msg } = data;

    // 如果后端设置的没有响应体, 直接返回
    // return response;

    // 如果后端设置的有响应体, 自定义
    if (code === 1) { // 后端自定义 acode
      return response;
    }

    console.warn("错误信息--", msg);
    return
  } else { // HTTP 失败
    let errMsg = showStatus(statusCode);
    console.error("请求失败--", errMsg);

    if (isShowFailToast) Taro.showToast({ title: errMsg, icon: 'none' });

    switch (statusCode) {
      case 401:
        Taro.clearStorage();
        Taro.reLaunch({ url: LOGIN_URL });
        break;
    }
    return
  }
}

/**
 * 参考官方文档
 * https://taro-docs.jd.com/docs/apis/network/request/addInterceptor
 */
const interceptor = async function (chain: Taro.Chain) {
  const requestParams = chain.requestParams;
  const { method, data, url } = requestParams;

  console.log(`http ${method || "GET"} --> ${url} data: `, data);

  let req = await requestInterceptor(requestParams); // 请求拦截器

  return chain.proceed(req).then((res: Taro.request.SuccessCallbackResult) => {

    console.log(`http <-- ${url} result:`, res);

    return responseInterceptor(req, res); // 响应拦截器
  });
};

export default interceptor;
