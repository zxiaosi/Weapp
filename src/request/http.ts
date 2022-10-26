import Taro from '@tarojs/taro'
import { BASE_URL } from '../config';
import interceptor from './interceptors';

// Taro 提供了两个内置拦截器
// logInterceptor - 用于打印请求的相关信息
// timeoutInterceptor - 在请求超时时抛出错误。
// const interceptors = [customInterceptor, Taro.interceptors.logInterceptor]
// Taro.addInterceptor(interceptor); // 必须写在这里

export interface IRequestData {
  [key: string]: any;
}

export interface IRequestOption extends Partial<Taro.request.Option<string | IRequestData>> {

  /**
   * 启动错误弹窗
   *
   * @type {boolean}
   * @memberof IFetchOption
   */
  showFailToast?: boolean;

  /**
   * 是否捕获错误 [接口status错误,阻止代码的继续运行]
   *
   * @type {boolean}
   * @memberof IFetchOption
   */
  isCatchFail?: boolean;
}

class HttpRequest {

  async request<T>(url: string, data: IRequestData | string = {}, options: IRequestOption): Promise<Taro.request.Promised<T>> {
    const requestUrl = BASE_URL + url;
    const requestOptions = { ...options };
    const header = { "Content-Type": "application/json" };
    const params = {
      url: requestUrl,
      data,
      header,
      ...requestOptions
    };

    Taro.addInterceptor(interceptor);
    const resp = await Taro.request(params);
    return resp;
  }
}

const http = new HttpRequest();
export default http;