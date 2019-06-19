// components/detail/comment/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    comment: Array,
    commentTotal: Number,
    goods_id: Number
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
    onCommentDetail (e) {
      wx.navigateTo({
        url: `/pages/comment/comment?goods_id=${this.data.goods_id}`,
      })
    }
  }
})
