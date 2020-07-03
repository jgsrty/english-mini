
const access = '03b9b2071c3dc8ee98450';
const token = 'a6cafe9f54406d6b36d'
const service = {
  get (url,data) {
    return new Promise((resolve,reject) => {
      wx.request({
        method: 'get',
        url: url,
        data: data,
        header: {
          "content-type": "application/json",
          "Authorization":"token " + access + token
        },
        success: (res) =>{
          // 调用接口成功
          if(res.statusCode !== 200){
            resolve(false)
          }else{
            resolve(res.data)
          }
        },
        fail: (err) => {
          // 调用接口失败
          wx.showToast({
            title: '服务器断开链接',
            icon:'none',
            duration: 2000
          })
          resolve(false)
        }
      })
    })
  },
  post (url,data) {
    return new Promise((resolve,reject) => {
      wx.request({
        method: 'post',
        url: url,
        data: data,
        header: {
          "content-type": "application/x-www-form-urlencoded",
          "Authorization":"token " + access + token
        },
        success: (res) =>{
          // 调用接口成功
          if(res.statusCode !== 200){
            resolve(false)
          }else{
            resolve(res.data)
          }
        },
        fail: (err) => {
          // 调用接口失败
          wx.showToast({
            title: '服务器断开链接',
            icon:'none',
            duration: 2000
          })
          resolve(false)
        }
      })
    })
  }
}

module.exports = service