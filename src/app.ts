import { Component, PropsWithChildren } from 'react'
import './app.less'
import { env } from './config';
import { requestToken } from './request/interceptors';

class App extends Component<PropsWithChildren> {

  async componentDidMount() {
    console.log("当前运行环境:", env);
    // await requestToken(); // 提前获取并保存token, 防止存储过慢导致的问题
  }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    // this.props.children 是将要会渲染的页面
    return this.props.children
  }
}

export default App
