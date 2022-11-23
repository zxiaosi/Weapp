import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { Component } from 'react'
import styles from "./index.module.less";
import * as echarts from "~/pages/echarts/wxecharts/echarts";

/**
 * 文件版:
 *    简单使用：https://blog.csdn.net/m0_45236510/article/details/122840656
 *    延迟加载：https://github.com/ecomfe/echarts-for-weixin/blob/master/pages/lazyLoad/index.js
 * 
 * 插件版: 
 *    npm: https://www.npmjs.com/package/echarts-taro3-react echarts-taro3-react
 *    报错解决: https://github.com/Cecilxx/echarts-taro3-react/issues/34
 *    建议使用: https://www.npmjs.com/package/taro3-echarts-react taro3-echarts-react
 */

interface Props {
  id: string;   // dom id
  width?: number | string; // 图表宽度 
  height?: number | string; // 图表高度
  delay?: number; // 延时时间(过多长时间之后获取dom)
  option: (chart: any) => void; // 配置项(返回一个对象)
}

export default class MyEcharts extends Component<Props, any> {
  constructor(props: any) {
    super(props);
  }

  static defaultProps = { // 属性的默认值
    width: "100%",
    height: "300px",
    delay: 200,
  }

  state = {
    ec: {
      lazyLoad: true, // 将 lazyLoad 设为 true 后，需要手动初始化图表
    },
    isLoaded: false,  // 是否显示
    isDisposed: false, // 是否销毁
  }

  chart: any; // echarts实例

  componentDidMount() {
    const { id, delay } = this.props;
    const { page } = Taro.getCurrentInstance();

    let that = this;
    setTimeout(() => {
      const echartsDom = page.selectComponent("#" + id);
      console.log("echartsDom", echartsDom);
      that.initChart(echartsDom);
    }, delay);
  }

  componentWillUnmount() {
    console.log("echart组件销毁了");
    this.dispose();
  }

  initChart(echartsDom: any) {
    const { option } = this.props;
    echartsDom.init((canvas: any, width: any, height: any, dpr: any) => {
      const chart = echarts.init(canvas, null, { width: width, height: height, dpr: dpr });

      if (option) option(chart);

      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;

      this.setState({ isLoaded: true, isDisposed: false });

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    })
  }

  dispose() {
    if (this.chart) this.chart.dispose();
    this.setState({ isDisposed: true });
  }

  render() {
    const { id, width, height } = this.props;
    const { ec } = this.state;

    return (
      <View className={styles.echarts} style={{ width, height }}>
        <ec-canvas id={id} canvas-id={id} ec={ec} />
      </View>
    )
  }
}