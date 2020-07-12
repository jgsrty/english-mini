//index.js
//获取应用实例
const app = getApp()
// homeApi接口
const homeApi = require('../../../api/home')
// base64解码
import base64 from '../../../utils/base64'
// store
import store from '../../../store'
import create from '../../../utils/create'

create(store, {
  data: {
    // 级联选择文件路径
    multiArray: [],
    multiIndex: [],
    objectMultiArray: [],
    // 月份
    monthSort: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    // 播放图标状态
    playState: '',
    // 播放文件路径array
    musicFiles: [],
  },
  // 添加收藏
  _addToCollected(e) {
    let ind = e.currentTarget.dataset.item
    let current = this.data.musicFiles[ind].title
    let storage = new Set(wx.getStorageSync('collectedList') || [])
    let text
    text = storage.has(current) ? "已添加到收藏" : "收藏成功"
    wx.showToast({
      title: text,
      icon: 'success',
      duration: 2000
    })
    storage.add(current)
    let storageArr = [...storage]
    this.store.data.collectedList = storageArr
    this.update()
    wx.setStorageSync('collectedList', storageArr)
    let musicFiles = this.data.musicFiles
    musicFiles[ind].showCellect = true
    this.setData({
      musicFiles
    })
  },
  // 初始话当前月份文章
  _initCurrentMonthArticles() {
    let year = new Date().getFullYear()
    let month = new Date().getMonth()
    let multiIndex = [0, 0]
    multiIndex[0] = this.data.objectMultiArray[0].indexOf(year.toString())
    multiIndex[1] = month - 1
    this.setData({
      'multiArray[0]': this.data.objectMultiArray[0],
      'multiArray[1]': this.data.objectMultiArray[1][multiIndex[0]],
      multiIndex
    })
    this.getRelateArticles()
  },
  // 选择月份 读取对应文章
  _bindMultiPickerChange(e) {
    this.setData({
      'multiIndex[0]': e.detail.value[0],
      'multiIndex[1]': e.detail.value[1]
    })
    this.getRelateArticles()
  },
  // 读取对应文章
  async getRelateArticles() {
    let year = this.data.multiArray[0][this.data.multiIndex[0]]
    let month = this.data.multiArray[1][this.data.multiIndex[1]]
    let res = await homeApi.getDocsPath(`${year}/${month}`)
    if (res) {
      res.map(item => {
        let ind = item.name.indexOf('.md')
        item.title = item.name.substring(0, ind)
      })
      let collectedList = this.store.data.collectedList
      res.map(item => {
        item.showCellect = collectedList.indexOf(item.title) > -1 ? true : false
      })
      this.setData({
        musicFiles: res
      })
    }
  },
  // 切换年份，选择月份
  _bindMultiPickerColumnChange(e) {
    let detail = e.detail
    if (detail.column === 0) {
      this.setData({
        'multiArray[0]': this.data.objectMultiArray[0],
        'multiArray[1]': this.data.objectMultiArray[1][detail.value],
        'multiIndex[0]': detail.value,
        'multiIndex[1]': 0,
      })
    } else {
      this.setData({
        'multiIndex[1]': detail.value,
      })
    }
  },
  // 选择播放当前文件
  async _playCurrentFile(e) {
    let fileName = e.currentTarget.dataset.item.title
    let mediaUrl = fileName
    this.store.data.currentPlayFileName = mediaUrl
    // 更新播放图标状态
    this.store.data.playState = true
    this.store.data.isAddNew = true
    this.update()
    // 切换至播放页
    let url = this.getTabBar().data.list[1].pagePath
    this.getTabBar().setData({
      activeTab: 1
    })
    wx.switchTab({
      url
    })
  },
  onLoad() {
    this._getDocsPath()
  },
  onShow() {
    this.update()
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
      let tempFirst = res.filter(item => item.type === 'dir')
      let firstLevel = tempFirst.map(item => item.name)
      let secondLevel = []
      for (let i = 0; i < firstLevel.length; i++) {
        let child = await homeApi.getDocsPath(firstLevel[i])
        if (child) {
          let tempSecond = child.map(cItem => cItem.name)
          let sortSecond = []
          // 自定义月份排序
          this.data.monthSort.filter(sortItem => {
            tempSecond.find(findItem => {
              if (findItem.indexOf(sortItem) > -1) {
                sortSecond.push(findItem)
              }
            })
          })
          secondLevel.push(sortSecond)
        }
      }
      this.setData({
        'objectMultiArray[0]': firstLevel,
        'objectMultiArray[1]': secondLevel
      })
      this._initCurrentMonthArticles()
    }
  },
  onShareAppMessage: function () {

  }
})