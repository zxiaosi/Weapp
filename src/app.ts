import Taro from '@tarojs/taro';
import { Component, PropsWithChildren } from 'react'
import './app.less'
import { env } from './config';

class App extends Component<PropsWithChildren> {

  componentDidMount() {
    console.log("当前运行环境:", env);
  }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    // this.props.children 是将要会渲染的页面
    return this.props.children
  }
}

export default App
