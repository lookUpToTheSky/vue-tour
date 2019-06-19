// components/cart/no-goods/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cartList: {
      type: Array,
      value: null,
      observer () {
        if (this.properties.cartList.length >0){
         this.setData({
           is_null: false
         })
       }else{
          this.setData({
            is_null: true
          })
        } 
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    is_null: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onShop () {
      wx.switchTab({
        url: '/pages/list/list',
      })
    }
  }
})
