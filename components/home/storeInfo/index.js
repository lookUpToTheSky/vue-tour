// components/address/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

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
    getDiscountCoupon () {
      wx.openCard({
        cardList: [{
          cardId: '0',
          code: '50'
        }],
        success(res) {
          console.log(res)
        },
        fail: error =>{
          console.log(error)
        }
      })
      wx.showToast({
        title: '成功领取一张50元优惠卷',
        icon: 'none',
        duration: 3000
      })
    }

  }
})
