// components/swiper/index.js
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
    keywords: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSearchGoods (e) {
      console.log(e.detail.value)
      wx.reLaunch({
        url: `/pages/list/list?keyword=${e.detail.value}`,
      })
    }
  }
})
