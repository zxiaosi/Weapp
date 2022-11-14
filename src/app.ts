import Taro from '@tarojs/taro';
import { Component, PropsWithChildren } from 'react'
import './app.less'

class App extends Component<PropsWithChildren> {

  componentDidMount() {
    const accountInfo = Taro.getAccountInfoSync();
    console.log("env:", accountInfo.miniProgram.envVersion);
  }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    // this.props.children 是将要会渲染的页面
    return this.props.children
  }
}

export default App
