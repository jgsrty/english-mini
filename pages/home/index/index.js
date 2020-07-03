//index.js
//获取应用实例
const app = getApp()
const homeApi = require('../../../api/home')

Page({
  data: {
    motto: 'Hello World',
  },
  onLoad() {
    // this._getHomeInfos()
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        activeTab: 0
      })
    }
  },
  async _getHomeInfos() {
    let res = await homeApi.getHomeInfos()
    if (res) {
      this.setData({
        motto: res.authorizations_url
      })
    }
  }
})