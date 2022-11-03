const { resolve } = require("path");

const config = {
  projectName: "Weapp",
  date: "2022-10-16",
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: "src",
  outputRoot: "dist",
  plugins: [],
  defineConstants: {},
  copy: {
    patterns: [],
    options: {}
  },
  alias: {
    "~": resolve(__dirname, "..", "src")
  },
  framework: "react",
  compiler: "webpack5",
  cache: {
    enable: true // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  mini: {
    postcss: {
      pxtransform: {
        // https://taro-docs.jd.com/docs/size
        enable: false, // px 自动转为 rpx
        config: {}
      },
      url: {
        enable: true,
        config: { // 相当于 配置 imageUrlLoaderOption
          limit: 512 // 设定转换尺寸上限, 单位为 b,(图片超过这个大小 不会 转为base64)
        }
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]"
        }
      }
    },
    // lessLoaderOption: {
    //   lessOptions: {
    //     strictMath: true,
    //     noIeCompat: true,
    //     javascriptEnabled: true,
    //     paths: [
    //       resolve(__dirname, "../src/modules"),
    //       resolve(__dirname, "../node_modules")
    //     ]
    //   }
    // }
  },
  h5: {
    publicPath: "/",
    staticDirectory: "static",
    postcss: {
      autoprefixer: {
        enable: true,
        config: {}
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]"
        }
      }
    }
  },
  rn: {
    appName: "taroDemo",
    postcss: {
      cssModules: {
        enable: true // 默认为 false，如需使用 css modules 功能，则设为 true
      }
    }
  }
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"));
  }
  return merge({}, config, require("./prod"));
};
