// components/cart/cartInfo/cart.js
import {CartModel} from '../../../model/cart.js'
let cartModel = new CartModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cart: {
      type:Array,
      value: null,
      observer () {
        let cartData = cartModel.getCartData()
        let selectedAll = true
        cartData.forEach((item, index) => {
          if (!item.goods_selected) {
            selectedAll = false
          }
        })
        if(this.data.cart.length <1){
          selectedAll = false
        }
        this.setData({
          selectedAll: selectedAll
        })
     }
    },
    count: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectedAll: false
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //点击改变商品数量
    changeBuyNum(e) {
      let target = e.currentTarget.dataset
      let buyNum = target.buynum
      let maxBuyNum = target.maxbuynum
      let goods_id = target.goods_id
      let type = target.type
      let warnStr = ''
      //减少购买数量
      if (type == 'reduce') {
        if(buyNum >1) {
          cartModel.changeCartBuyNum(goods_id, type)
        } else {
          warnStr = `亲，不能再减少了`
          this._showWarn(warnStr)
        }
      } 
      //输入购买数量
      if (type == 'change') {
        buyNum = e.detail.value
        cartModel.changeCartBuyNum(goods_id, type, buyNum);
        switch (true) {
          case (buyNum < 1): 
            cartModel.changeCartBuyNum(goods_id, type, 1);
            warnStr = `购买数量不能低于1件`
            this._showWarn(warnStr)
            break;
          case (buyNum > maxBuyNum): 
            cartModel.changeCartBuyNum(goods_id, type, maxBuyNum);
            warnStr = `限购${maxBuyNum}件`;
            this._showWarn(warnStr);
            break;
          }
        }
        //增加购买数量
        if (type == 'increase'){
          if (buyNum < maxBuyNum){
            cartModel.changeCartBuyNum(goods_id, type)
          }else{
            warnStr = `限购${maxBuyNum}件`
            this._showWarn(warnStr)
          } 
        }
      this._initCart()
      },
    //改变商品选中状态  
    onSelecteGoods(e) {
      const goods_id = e.currentTarget.dataset.goods_id
      cartModel.selectStatus(goods_id)
      this._initCart()
    },
    //全选商品
    onSelectedAll () { 
      if (this.data.cart.length > 0){
        cartModel.selectedAll(!this.data.selectedAll)
        this._initCart()
      }
    },
    //删除商品
    onDeleteGoods (e) {
      let goods_id = e.currentTarget.dataset.goods_id
      cartModel.deleteGoods(goods_id)
      this._initCart()
      this.triggerEvent("deleteGoods",this.data.cart)
      if(this.data.cart.length <1){
        this.setData({
          selectedAll: false
        })
      }
    },
    //清空购物车
    onClearCart () {
      cartModel.clearCart()
      this._initCart()
      this.setData({
        selectedAll: false
      })
      this.triggerEvent("clearCart")
    },
    //去结算
    onPay () {
      let count = cartModel.getSelectedTotal()
      if(count != 0.00){
        wx.navigateTo({
          url: '/pages/pay/pay',
        })
      }else{
        wx.showToast({
          title: '还没有选择商品！',
          icon:'none'
        })
      }

    },
    //提示
    _showWarn (str) {
      wx.showToast({
        icon: 'none',
        title: str,
      })
    },
    //购物车重新加载
    _initCart () {
      let cartData = cartModel.getCartData()
      let selectedAll = true
      cartData.forEach((item, index) => {
        if (!item.goods_selected) {
          selectedAll = false
        }
      })
      this.setData({
        cart: cartModel.getCartData(),
        count: cartModel.getSelectedTotal(),
        selectedAll: selectedAll
      })
    }
  }
})
