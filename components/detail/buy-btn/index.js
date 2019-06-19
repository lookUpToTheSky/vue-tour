// components/detail/comment/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    buyNum: {
      type: Number,
      value: 0,
    },
    maxBuyNum: {
      type: Number,
      value: 1,
    },
    cartCount: {
      type: Number,
      value: 1,
      observer () {
      }
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //跳转页面
    goToTab (e) {
      const id = e.currentTarget.dataset.id
      let url = ''
      switch (id) {
        case 0: url ='/pages/me/me'
        break;
        case 1: url = '/pages/cart/cart'
          break;
        case 2: url = '/pages/home/home'
          break;
      }
      wx.switchTab({
        url: url,
      })
    },
    //加入购物车
    onAddToCart (e) {
      if(e.currentTarget.dataset.type == 'buy'){
        this.triggerEvent('addCart', -this.data.buyNum);           
        wx.navigateTo({
          url: `../../pages/pay/pay?buyNum=${this.data.buyNum}`
        })
      }else{
        this.triggerEvent('addCart', this.data.buyNum)
      }
    }
  } 
})