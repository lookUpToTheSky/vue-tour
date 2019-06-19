import { HTTP } from '../utils/http.js'
import { config } from '../config.js'
class UserModel extends HTTP {
  constructor () {
    super()
    this.userInfo = 'userInfo'
    this.baseUserInfo = 'baseUserInfo'
  }
  getTokenFromSever (code) {
    //服务器获取token
    return this.request ({
      url: 'api/token/user',
      data: {
        code,
        appId: config.appId,
        appSecret: config.appSecret
      },
      method: 'POST'
    })
  }
  //本地保存token
  setToken(token) {
    return wx.setStorageSync('token', token)
  }
  //本地获取token
  getToken() {
    return wx.getStorageSync('token')
  }
  //核对token是否有效
  checkedToken(token) {
    return this.request({
      url: 'api/token/check',
      data: {token},
      method: 'POST'
    })
  }
  //保存用户信息
  setUserInfo (data) {
    wx.setStorageSync(this.userInfo, data)
  }
  //获取用户信息
  getUserInfo() {
    return wx.getStorageSync(this.userInfo)
  }
  //保存用户基本信息
  setBaseUserInfo (sex, born) {
    const data = {sex: sex, born: born}
    wx.setStorageSync(this.baseUserInfo, data)
  }
  //获取用户信息
  getBaseUserInfo() {
    return wx.getStorageSync(this.baseUserInfo)
  }
}
export { UserModel}