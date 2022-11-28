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