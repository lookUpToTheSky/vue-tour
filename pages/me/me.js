// pages/me/me.js
import {UserModel} from '../../model/user.js'
import { AddressModel } from '../../model/address.js'
const userModel = new UserModel()
const addressModel = new AddressModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  //
  onEditor (e) {
    if (e.detail){
      userModel.setUserInfo(e.detail.userInfo)
    }
    wx.navigateTo({
      url: '/pages/editor/editor',
    })
  },
  // 修改地址
  onChooseAddress () {
    wx.chooseAddress({
    success: res => {
      const address = addressModel.editorUserInfo(res)
      addressModel.setAddress({
        userInfo: address.userInfo,
        address: address.address
        })
      }
    })
  }
})