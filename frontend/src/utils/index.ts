import Taro from "@tarojs/taro";

/** 获取系统环境 */
export function getSystemEnv() {
  let env = "develop";

  if (process.env.TARO_ENV != "weapp") return env;

  try {
    const { miniProgram: { envVersion } } = Taro.getAccountInfoSync();
    env = envVersion;
  } catch (e) {
    console.error("获取运行环境失败!", e);
  }

  return env;
}

/**
 * 微信线上版本更新检测
 */
export const checkUpdate = async () => {
  const updateManager = Taro.getUpdateManager();

  updateManager.onCheckForUpdate(function (res) {
    // 请求完新版本信息的回调
    console.log("是否有新版本推送:", res.hasUpdate);
  });

  updateManager.onUpdateReady(function () {
    Taro.showModal({
      title: "更新提示",
      content: "新版本已经准备好，是否重启应用？",
      success: function (res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate();
        }
      },
    });
  });
  
  updateManager.onUpdateFailed(function () {
    // 新的版本下载失败
  });
};
