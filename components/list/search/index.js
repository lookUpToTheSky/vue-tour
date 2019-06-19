// components/list/search/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    keyword: String
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
    onShowCategory () {
      this.triggerEvent('show')
    },
    searchGoods(e) {
      this.triggerEvent('search',e.detail)
    }
  }
})
