const access_token = 'be70a45bd30aea25893ab08b3924e613'
const baseUrl = 'https://gitee.com/'
const service = {
  get(url, data) {
    let reqUrl = url.indexOf('http') === -1 ? baseUrl + url : url
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'get',
        url: reqUrl,
        data: {
          access_token,
          ...data
        },
        header: {
          "content-type": "application/json",
        },
        success: (res) => {
          // 调用接口成功
          if (res.statusCode !== 200) {
            resolve(false)
          } else {
            resolve(res.data)
          }
        },
        fail: (err) => {
          console.log(err)
          // 调用接口失败
          wx.showToast({
            title: err,
            icon: 'none',
            duration: 2000
          })
          resolve(false)
        }
      })
    })
  },
  post(url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'post',
        url: baseUrl + url,
        data: data,
        header: {
          "content-type": "application/x-www-form-urlencoded",
        },
        success: (res) => {
          // 调用接口成功
          if (res.statusCode !== 200) {
            resolve(false)
          } else {
            resolve(res.data)
          }
        },
        fail: (err) => {
          // 调用接口失败
          wx.showToast({
            title: '服务器断开链接',
            icon: 'none',
            duration: 2000
          })
          resolve(false)
        }
      })
    })
  }
}

module.exports = service