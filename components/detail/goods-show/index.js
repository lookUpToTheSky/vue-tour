// components/detail/goods-show/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goodsImgs: Array,
    goods: Object,
    buyNum: Number,
    maxBuyNum: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    current: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange (e) {
      this.setData({
        current: e.detail.current
      })
    },
    //减少购买数量
    redBuyNum () {
      if (this.data.buyNum >1) {
        const buyNum = --this.data.buyNum
        this.setData({
          buyNum: buyNum
        })
      } else {
        wx.showToast({
          icon: 'none',
          title: `亲，不能再减了`,
        })
      }
      this.toBuyNum ()
    },
    //改变购买数量
    inputBuyNum (e) {
      let buyNum = e.detail.value
      let maxBuyNum = this.data.maxBuyNum
      switch (true) {
        case (buyNum < 1): buyNum = 1
          wx.showToast({
            icon: 'none',
            title: `商品数量不能低于1`,
          })
          break;
        case (buyNum > maxBuyNum): buyNum = maxBuyNum
          wx.showToast({
            icon: 'none',
            title: `限购${this.data.maxBuyNum}件`,
          })
          break;
      }
      this.setData({
        buyNum: buyNum
      })
      this.toBuyNum()
    },
    //增加购买数量
    incBuyNum () {
      if (this.data.buyNum < this.data.maxBuyNum) {
        const buyNum = ++this.data.buyNum 
        this.setData({
          buyNum: buyNum
        })
      }else {
        wx.showToast({
          icon: 'none',
          title: `限购${this.data.maxBuyNum}件`,
        })
      }
      this.toBuyNum()
    },
    //传到page
    toBuyNum () {
      this.triggerEvent('getBuyNum', this.properties.buyNum)
    }
  }
})
