// components/swiper/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgs: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    circular: true,
    current: 0,
    swiperCurrent: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChangeSwiper (e) {
      this.setData({
        swiperCurrent: e.detail.current
      })
    },
    onChangeDot (e) {
      this.setData({
        current: e.currentTarget.dataset.index
      })
    }
  }
})
