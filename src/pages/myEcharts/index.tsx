import { View } from "@tarojs/components";
import * as echarts from "~/modules/wxecharts/echarts";

/**
 * https://blog.csdn.net/m0_45236510/article/details/122840656
 */

definePageConfig({
  navigationBarTitleText: "Echarts",
  usingComponents: { "ec-canvas": "~/modules/wxecharts/ec-canvas" }, // 会导致 useReady 出现问题
});

import React, { Component } from 'react'

export default class MyEcharts extends Component {
  constructor(props: any) {
    super(props);

    this.state = {
      ec: {
        onInit: function (canvas, width, height) {
          const chart = echarts.init(canvas, null, {
            width: width,
            height: height
          });
          canvas.setChart(chart);
          const option = {
            title: {
              text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
              data: ['销量']
            },
            xAxis: {
              data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [
              {
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
              }
            ]
          };
          chart.setOption(option)
          return chart;
        }
      }
    }
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  render() {
    return (
      <View style={{width: "100%", height: "300px"}}>
        <ec-canvas id='mychart-dom-bar' canvas-id='mychart-bar' ec={this.state.ec} />
      </View>
    )
  }
}

