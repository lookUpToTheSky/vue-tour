// pages/cart/cart.js
import {CartModel} from '../../model/cart.js'
let cartModel = new CartModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: null,
    count: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '购物车',
    })
  },
  //获取购物车数据
  _getCartData () {
    this.setData({
       cartList: cartModel.getCartData()
    })
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
    this._getCartData()
    this.setData({
      count: cartModel.getSelectedTotal()
    }) 
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

  },
  //删除商品
  deleteGoods (e) {
    this.setData({
      cartList: e.detail
    })
  },
  clearCart () {
    this.setData({
      cartList: null
    })
  }
})