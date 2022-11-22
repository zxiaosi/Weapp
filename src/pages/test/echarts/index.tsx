import { View } from "@tarojs/components";
import { Component } from 'react'
import styles from "./index.module.less";
import MyEcharts from "~/components/myEchrts";
import { get } from "~/request";

definePageConfig({
  navigationBarTitleText: "Echarts",
  // 使用echarts一定要先导入, 否则导致拿不到dom (会导致 useReady 出现问题)
  usingComponents: { "ec-canvas": "~/modules/wxecharts/ec-canvas" },
});

export default class EchartsTest extends Component {
  constructor(props: any) {
    super(props);
  }

  state = {}

  componentDidMount() { }

  echartsOption(data1: any, data2: any, data3: any) {
    let option = {
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
          data: data1,
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
          data: data2,
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
          data: data3,
          itemStyle: {
            // emphasis: {
            //   color: '#67e0e3'
            // }
          }
        }
      ]
    };

    return option;
  }

  async initEchartsData(chart) {
    // 测试数据
    let dataArr = [
      [300, 270, 340, 344, 300, 320, 310],
      [120, 102, 141, 174, 190, 250, 220],
      [-20, -32, -21, -34, -90, -130, -110]
    ];

    let repo1 = get("", {}, { url: "https://api.github.com/repos/facebook/react/languages", isShowFailToast: false });
    let repo2 = get("", {}, { url: "https://api.github.com/repos/NervJS/taro/languages", isShowFailToast: false });
    let repo3 = get("", {}, { url: "https://api.github.com/repos/webpack/webpack/languages", isShowFailToast: false });

    const [{ data: data1 }, { data: data2 }, { data: data3 }] = await Promise.all([repo1, repo2, repo3]);
    console.log("data", data1, data2, data3);

    let option = this.echartsOption(Object.values(data1).splice(0, 7), Object.values(data2).splice(0, 7), Object.values(data3).splice(0, 7));
    chart.setOption(option);
  }

  render() {
    return (
      <View>
        <MyEcharts id="echarts" option={async (chart) => { await this.initEchartsData(chart) }} />
      </View>
    )
  }
}