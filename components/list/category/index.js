// components/list/category/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    category: Array
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
    onHideCategory (e) {
      
      this.triggerEvent('hide',{cat_id:-1})
    },
    onSelectCategory (e) {
      let cat_id = e.target.dataset.cat_id
      this.triggerEvent('hide', { cat_id })
    }
  }
})
