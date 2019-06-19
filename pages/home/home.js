// pages/home/home.js
import {HomeModel} from '../../model/home.js'
import { UserModel } from '../../model/user.js'
import { AddressModel } from '../../model/address.js'
const userModel = new UserModel()
const addressModel = new AddressModel()
let homeModel = new HomeModel()
Page({
  /**
   * 页面的初始数据
   */
data: {
  page: 1,
  count: 2,
  totalPage: 0,
  swiperList: null,
  hotGoods:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
onLoad: function (options) {
  wx.removeStorageSync('hot')
  this._getGoodsCount()
  this._getSwiper()
  this._getHotGoods(this.data.page, this.data.count)
},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this._getToken()
  },
 // 登录
 _login () {
   wx.login({
     success: res => {
       if (res.code) {
         userModel.getTokenFromSever(res.code).then(res => {
           userModel.setToken(res.data.data.token)
         })
       }
     },
     fail: error => {

     }
   })
 },
 //获取token
 _getToken () {
   if (!userModel.getToken()){
      this._login()
   }else{
      userModel.checkedToken(userModel.getToken()).then(res => {
      if(!res.data.data.isValid) {
        this._login()
      }  
    })
   }
 },
//获取轮播图
_getSwiper () {
 const swiper = wx.getStorageSync('swiper')
 if (!swiper) {
    homeModel.getSwiper().then((res)=>{
      let swiperList = []
      res.data.data.forEach((item) => {
        swiperList.push(item.img)
      })
      this.setData({
        swiperList: swiperList
      })
      wx.setStorageSync('swiper', swiperList)
    })
  }else{
    this.setData({
      swiperList: swiper
    })
  }
},

_getHotGoods (page, count) {
  let hotData = this.data.hotGoods
  homeModel.getHotGoods({
    page,
    count,
  }).then(res => {
    let result = res.data.data.goods
    let totalpage = page
    if (result) {
      if (!hotData) {
        hotData = result
      } else {
        result.forEach(item => {
          hotData.push(item)
        })
      }
      this.setData({
        hotGoods: hotData
      })
    }
  })
},

_getGoodsCount () {
  homeModel.getGoodsCount().then(res => {
    let totalPage = res.data.data / this.data.count
    this.setData({
      totalPage: totalPage
    })
  })
},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
  let page = this.data.page + 1
  if(page <= this.data.totalPage){
    this.setData({
      page: page
    })
    this._getHotGoods(page, this.data.count)
  }
},
  /**
   * 用户点击右上角分享
   */
onShareAppMessage: function () {

}
})