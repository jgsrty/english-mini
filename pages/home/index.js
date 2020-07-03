//index.js
//获取应用实例
const app = getApp()
const homeApi = require('../../api/home')

Page({
  data: {
    motto: 'Hello World',
  },
  onLoad() {
    this._getHomeInfos()
  },
  async _getHomeInfos() {
    // homeApi.getHomeInfos(params).then(res => {
    //   console.log(res)
    // }).catch(err => {
    //   console.log(err)
    // })
    let res = await homeApi.getHomeInfos()
    if (res) {
      this.setData({
        motto: res.authorizations_url
      })
    }
  }
})