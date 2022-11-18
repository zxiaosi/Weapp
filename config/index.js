import { resolve } from "path";

// 配置详解 https://taro-docs.jd.com/docs/config
const config = {
  projectName: 'demo',
  date: '2022-11-14',
  designWidth: 750,
  deviceRatio: { // 设计稿尺寸换算规则
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: { // 全局变量设置
  },
  copy: { // 文件 copy 配置
    patterns: [
    ],
    options: {
    }
  },
  alias: {
    "~": resolve(__dirname, "..", "src"),
  },
  framework: 'react', // 框架，react，nerv，vue, vue3 等
  compiler: 'webpack5',
  cache: {
    enable: true // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: false, // px 自动转为 rpx
        config: {

        }
      },
      url: { // 小程序端样式引用本地资源内联配置
        enable: true,
        config: { // 相当于 配置 imageUrlLoaderOption
          limit: 512 // 设定转换尺寸上限, 单位为 b,(图片超过这个大小 不会 转为base64)
        }
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    compile: { // 编译过程的相关配置 https://taro.redwoodjs.cn/docs/2.x/config-detail#minicompile
      exclude: [ // 排除某个文件
        resolve(__dirname, '..', 'src/modules/mqtt/*.js'),
        resolve(__dirname, '..', 'src/modules/qqmap/*.js'),
        resolve(__dirname, '..', 'src/modules/wxecharts/*.js'),
      ]
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  rn: {
    appName: 'taroDemo',
    postcss: {
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
      }
    }
  }
}

export default function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
