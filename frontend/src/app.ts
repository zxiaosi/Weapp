import { Component, PropsWithChildren } from 'react'
import './app.less'
import { env } from './config';
import { checkUpdate } from './utils';

class App extends Component<PropsWithChildren> {

  async componentDidMount() {
    console.log("当前运行环境:", env);

    await checkUpdate(); // 挂载全局唯一的版本更新管理器
  }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    // this.props.children 是将要会渲染的页面
    return this.props.children
  }
}

export default App
