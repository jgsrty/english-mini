//index.js
//获取应用实例
const app = getApp()
const homeApi = require('../../../api/home')
import base64 from '../../../utils/base64'

Page({
  data: {
    musicFiles: [],
    test: ''
  },
  async _playCurrentFile(e) {
    let fileName = e.currentTarget.dataset.item.name
    let res = await homeApi.getDocsPath(fileName)
    if (res) {
      let content = base64.decode(res.content)
      this.setData({
        test:content
      })
      console.log(content)
      // let mdWords = await homeApi.getDocsRaw(res.download_url)
      // if (mdWords) {
      //   console.log(mdWords)
      //   this.setData({
      //     test: mdWords
      //   })
      // }
    }
  },
  onLoad() {
    this._getDocsPath()
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        activeTab: 0
      })
    }
  },
  onHide: function () {
    app.globalData.backTabIndex = 0
  },
  async _getDocsPath() {
    let res = await homeApi.getDocsPath()
    if (res) {
      this.setData({
        musicFiles: res
      })
    }
  },
})