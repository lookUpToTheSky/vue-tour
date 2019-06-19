// components/hot/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgs: Array,
    goods: Object,
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
    onGoDetail (e) {
      const goods_id = e.currentTarget.dataset.goods_id
      wx.navigateTo({
        url: `/pages/detail/detail?id=${goods_id}`,
      })
    }
  }
})
