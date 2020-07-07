// pages/player/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  // 返回上一页
  _backPage(){
    // 上个tab下标，全局参数：backTabIndex
    let index = app.globalData.backTabIndex
    let url = this.getTabBar().data.list[index].pagePath
    this.getTabBar().setData({
      activeTab: index
    })
    wx.switchTab({url})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        activeTab: 1
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})