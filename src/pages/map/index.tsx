import Taro from "@tarojs/taro";
import { Component, PropsWithChildren } from "react";
import { Map } from "@tarojs/components";
import styles from "./index.module.less";
import { tencentMapKey } from "~/config";
import { requirePlugin } from "@tarojs/taro";


let QQMapWX = require('~/modules/qqmap/qqmap-wx-jssdk');
// const citySelector = requirePlugin("citySelector");

class MyMap extends Component<PropsWithChildren> {
  constructor(props: PropsWithChildren) {
    super(props);
  }

  mapApi = new QQMapWX({ key: tencentMapKey })

  state = {
    latitude: 30.173031,
    longitude: 120.294113,
  };

  componentDidMount() {
    // Taro.getLocation({
    //   type: 'wgs84',
    //   success: function (res) {
    //     debugger
    //     const { latitude, longitude } = res;
    //     this.setState({ latitude, longitude })
    //   }
    // });
  }

  onTap(e) {
    console.log("onTap--", e);
  };

  onMarkerTap(e) {
    console.log("onMarkerTap--", e);
  };

  onRegionChange(e) {
    console.log("onRegionChange--", e);
  };

  render() {
    const { latitude, longitude } = this.state;

    return (
      <Map
        id="myMap"
        showLocation={true}
        enableRotate
        className={styles.map}
        longitude={longitude}
        latitude={latitude}
        onTap={this.onTap}
        onMarkerTap={this.onMarkerTap}
        onRegionChange={this.onRegionChange}
      />
    );
  }
}

export default MyMap;