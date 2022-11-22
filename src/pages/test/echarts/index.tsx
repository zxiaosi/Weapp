import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { Component } from 'react'
import styles from "./index.module.less";
import * as echarts from "~/modules/wxecharts/echarts";

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

definePageConfig({
  usingComponents: { "ec-canvas": "~/modules/wxecharts/ec-canvas" }, // 会导致 useReady 出现问题
});

interface Props {
  id: string;   // dom id
  width?: number | string; // 图表宽度 
  height?: number | string; // 图表高度
  delay?: number; // 延时时间(过多长时间之后获取dom)
  option: () => Object; // 配置项(返回一个对象)
}

export default class MyEcharts extends Component<Props, any> {
  constructor(props: any) {
    super(props);
  }

  static defaultProps = { // 属性的默认值
    id: "echarts",
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
  ecComponent: any; // echarts组件

  componentDidMount() {
    const { id, delay } = this.props;
    const { page } = Taro.getCurrentInstance();

    let that = this;
    setTimeout(() => {
      that.ecComponent = page.selectComponent("#" + id);
      console.log("this.ecComponent", that.ecComponent);
      that.initChart();
    }, delay);
  }

  setChartOption(chart: any) {
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: ['热度', '正面', '负面']
      },
      grid: {
        left: 20,
        right: 20,
        bottom: 15,
        top: 40,
        containLabel: true
      },
      xAxis: [
        {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#666'
          }
        }
      ],
      yAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: ['汽车之家', '今日头条', '百度贴吧', '一点资讯', '微信', '微博', '知乎'],
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#666'
          }
        }
      ],
      series: [
        {
          name: '热度',
          type: 'bar',
          label: {
            normal: {
              show: true,
              position: 'inside'
            }
          },
          data: [300, 270, 340, 344, 300, 320, 310],
          itemStyle: {
            // emphasis: {
            //   color: '#37a2da'
            // }
          }
        },
        {
          name: '正面',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true
            }
          },
          data: [120, 102, 141, 174, 190, 250, 220],
          itemStyle: {
            // emphasis: {
            //   color: '#32c5e9'
            // }
          }
        },
        {
          name: '负面',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'left'
            }
          },
          data: [-20, -32, -21, -34, -90, -130, -110],
          itemStyle: {
            // emphasis: {
            //   color: '#67e0e3'
            // }
          }
        }
      ]
    };

    chart.setOption(option);
  }

  initChart() {
    console.log("initChart", this.ecComponent);
    this.ecComponent.init((canvas: any, width: any, height: any, dpr: any) => {
      const chart = echarts.init(canvas, null, { width: width, height: height, dpr: dpr });
      this.setChartOption(chart);

      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;

      this.setState({ isLoaded: true, isDisposed: false });

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    })
  }

  dispose() {
    if (this.chart) {
      this.chart.dispose();
    }

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

