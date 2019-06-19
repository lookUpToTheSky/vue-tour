// pages/detai/detail.js
import {DetailModel} from '../../model/detail.js'
import { CartModel } from '../../model/cart.js'
const detailModel = new DetailModel()
const cartModel = new CartModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsImgs: null,
    goods: null,
    comment: null,
    commentTotal: 0,
    buyNum: 1,
    maxBuyNum: 5,
    goods_id: 0,
    cartCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const goods_id = options.id
    this.setData({
      goods_id: options.id
    })
    // const goods_id = 1
    this._getGoodsInfo(goods_id)
  },
  onShow: function () {
    this._getCartCount()
  },
  //获取商品信息
  _getGoodsInfo(goods_id) {
    detailModel.getGoods(goods_id).then(res=>{
      const data = res.data.data
      if (data.gallery.length < 1){
        let img = []
        img.push(data.goods.goods_img)
        this.setData({
          goodsImgs: img
        })
      }else{
        this.setData({
          goodsImgs: data.gallery
        })
      }
      this.setData({
        goods: data.goods,
        comment: data.comment,
        commentTotal: data.commentTotal
      })
      wx.setNavigationBarTitle({
        title: this.data.goods.goods_name,
      })
    })
  },
  //获取购物车商品数量
  _getCartCount() {
    this.setData({
      cartCount: cartModel.getCartCount()
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  },
  //获得购买数量
  getBuyNum (e) {
    this.setData({
      buyNum: e.detail,
    })
  },
  //加入购物车
  addCart (e) {
    const goods = {
      goods_selected: true,
      goods_id: this.data.goods.goods_id,
      goods_img: this.data.goods.goods_img,
      goods_name: this.data.goods.goods_name,
      goods_price: this.data.goods.goods_price,
      goods_maxBuyNum: this.data.maxBuyNum
    }
    if (e.detail < 0) {
      goods.goods_buyNum = -e.detail
      wx.setStorageSync('buyCurrentGoods', goods)
    }else{
      goods.goods_buyNum = e.detail
      this.setData({
        buyNum: e.detail,
      })
      cartModel.addCart(goods).then(this._getCartCount)
    }
  }
})