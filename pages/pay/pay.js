// pages/pay/pay.js
import {CartModel} from '../../model/cart.js'
import { AddressModel } from '../../model/address.js'
import { UserModel } from '../../model/user.js'
const cartModel = new CartModel()
const addressModel = new AddressModel()
const userModel = new UserModel()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cartList: null,
    userInfo: null,
    address: null,
    account: 0,
    goodsCount: 0,
    token: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
    if (options.buyNum){
      this._getCurrentGoods()
    }else{
      this._initGoods() 
    }
    this._init()  
  },
  onShow: function () {

  },
  //页面初始化
  _init(){
    wx.setNavigationBarTitle({
      title: '确认支付'
    })
    this.setData({
      token: userModel.getToken()
    })  
    this._getAddress()
  },
  //商品信息初始化
  _initGoods () {
    this._getCart()
    this.setData({
      account: cartModel.getSelectedTotal(),
      goodsCount: cartModel.getCartCount(true),
    })  
  },
  //购买当前商品
  _getCurrentGoods () {
    const goodsList = [] 
    const goods = wx.getStorageSync('buyCurrentGoods')
    goodsList.push(goods)
    this.setData({
      cartList: goodsList,
      account: goods.goods_price * goods.goods_buyNum,
      goodsCount: goods.goods_buyNum
    })
  },
  //获取地址
  _getAddress () {  
    const address = addressModel.getAddress()
    if(!address){
      addressModel.getAddressFromSever(this.data.token).then(res =>{
        let result = res.data.data
        this.setData({
          userInfo: result,
          address: result.address
        })
      })
    }else {
      this.setData({
        userInfo: address.userInfo,
        address: address.address
      })
    }
  },
  //获取结算商品
  _getCart () {
    let cartData = cartModel.getCartData()
    let cartList = [] 
    if(cartData.length > 0) {
      cartData.forEach((item, index) => {
        if (item.goods_selected) {
          cartList.push(item)
        }
      })
      this.setData({
        cartList: cartList
      })
    }
  },
  //添加收货地址
  onChooseAddress () {
    wx.chooseAddress({
      success: res =>{
        const address = addressModel.editorUserInfo(res)
        this.setData({
          userInfo: address.userInfo,
          address: address.address
        })
        addressModel.setAddressToSever(this.data.token, this.data.userInfo, this.data.address)
      }
    })
  },
  //提交订单
  onPostOrder () {
    wx.requestPayment({
      timeStamp: '',
      nonceStr: '',
      package: '',
      signType: 'MD5',
      paySign: '',
      success(res) { 
        
      },
      fail(res) {
        wx.showToast({
          title: "系统异常！",
          icon: 'none',
          duration: 1000
        })
       }
    })
    
  }
})