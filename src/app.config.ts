export default defineAppConfig({
  entryPagePath: 'pages/home/index', // 小程序默认启动首页 (仅小程序端)
  pages: [
    'pages/home/index',
    'pages/hookTest/index',
    'pages/myEcharts/index',
    'pages/myMap/index',
  ],
  subPackages: [ // 分包

  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  permission: { // 小程序接口权限相关设置 (仅小程序端)
    'scope.userLocation': {
      desc: '你的位置信息将用于小程序位置接口的效果展示'
    }
  },
  // https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#requiredPrivateInfos
  requiredPrivateInfos: ["getLocation", "onLocationChange"], // 申明地理位置
  requiredBackgroundModes: ["location"], // 申明需要后台运行的能力 (仅小程序端)
  lazyCodeLoading: "requiredComponents", // 组件代码按需注入 (仅微信小程序)
})
