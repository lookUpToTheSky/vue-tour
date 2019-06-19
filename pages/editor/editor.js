// pages/editor/editor.js
import { UserModel } from '../../model/user.js'
const userModel = new UserModel()
const date = new Date()
const years = []
const months = []
const days = []
for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}
for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    sexData: [{ 
      name: '未知',
      value: 0,
      check: true
      },{
        name: '男',
        value: 1,
      },{
        name: '女',
        value: 2,
      }],
    sex: 0, 
    showChoose: false,
    years: years,
    months: months,
    days: days,
    value: [date.getFullYear(), date.getMonth(),date.getDate()-1],
    born: '',
    is_born: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._init()
  },
  _init () {
    wx.setNavigationBarTitle({
      title: '个人信息',
    })
    this.setData({
      userInfo: userModel.getUserInfo(),
    })
    if (userModel.getBaseUserInfo()){
      this.setData({
        userInfo: userModel.getUserInfo(),
        sex: userModel.getBaseUserInfo().sex,
        born: userModel.getBaseUserInfo().born
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  //选择性别
  onChangeSex (e) {
    this.setData({
      sex: e.detail.value
    })
  },
  //选择生日
  onChangeBorn (e) {
    let born = e.detail.value
    let bornArr = []
    born.forEach((item, index) =>{
      if(index == 0){
        item = 2000+item-11
      }
      bornArr.push(item + 1)
    })
    this.setData({
      is_born: bornArr.join('-')
    })
  },
  //显示选择块
  onChooseBorn () {
    this.setData({
      showChoose: true
    })
  },
  //完成选择
  onChooseOpt (e) {
    const type = e.currentTarget.dataset.type
    if(type == 'confirm'){
      this.setData({
        born: this.data.is_born
      })
    }
    this.setData({
      showChoose: false
    })
  },
  //点击保存用户信息
  onSaveInfo () {
    if (this.data.sex || this.data.born){
      userModel.setBaseUserInfo(this.data.sex, this.data.born)
      wx.showToast({
        title: '保存成功',
        icon: 'none'
      })
    }else{
      wx.showToast({
        title: '没有修改信息',
        icon: 'none'
      })
    }
    
  }
})