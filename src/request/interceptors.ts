function requestWillMount() {
  console.log("请求拦截器--requestWillMount");
}

function requestDidMount() {
  console.log("响应拦截器--requestDidMount");
}

/**
 * 参考官方文档
 * https://taro-docs.jd.com/docs/apis/network/request/addInterceptor
 */
const interceptor = function (chain) {
  const requestParams = chain.requestParams;
  const { method, data, url } = requestParams;

  // 请求拦截器
  requestWillMount();
  console.log(`http ${method || "GET"} --> ${url} data: `, data);

  return chain.proceed(requestParams).then(res => {
    // 响应拦截器
    requestDidMount();
    console.log(`http <-- ${url} result:`, res);
    return res;
  });
};

export default interceptor;
