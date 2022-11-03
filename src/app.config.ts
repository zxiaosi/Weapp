export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/map/index',
    'pages/test/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  // 小程序插件配置
  plugins: {},
  // 位置授权
  permission: {},
  // https://taro-docs.jd.com/docs/app-config#lazycodeloading 
  lazyCodeLoading: "requiredComponents"
})
