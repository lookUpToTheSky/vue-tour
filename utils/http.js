import {config} from '../config.js'
class HTTP{
  request({url, data={},method='GET',header={}}) {
    header.appkey = config.appkey
   return new Promise((resolve, reject) =>{
     wx.request({
       url: config.baseUrl + url,
       data: data,
       header,
       method: method,
       success: res => {
         const statusCode = res.statusCode
         if (Math.floor(statusCode / 100) === 2) {
           let error_code = res.data.error_code
           if (error_code === 0) {
             resolve(res)
           }
         } else {
           reject(res)
           this._showError()
         }
       }
     })
    })
  }
  //获取失败调用此函数
  _showError() {
    wx.showToast({
      title: '接口调用失败！',
      icon: 'none',
      duration: 2000
    })
  }
}
export {HTTP} 