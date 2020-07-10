export default {
  data: {
    playState:false,  //播放状态
    isAddNew:false, //是否为新添加歌曲播放
    collectedList:wx.getStorageSync('collectedList') || [], //已收藏文章
    currentPlayFileName:''
  }
}