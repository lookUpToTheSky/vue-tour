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
    swiperCurrent: 0,
    swiperImgs: ['https://img.alicdn.com/imgextra/i1/118523163/TB2mllcETlYBeNjSszcXXbwhFXa_!!0-saturn_solar.jpg_230x230_.webp', 'https://img.alicdn.com/imgextra/i1/27641373/O1CN01bavnIX1M0sKQMJdF6_!!0-saturn_solar.jpg_230x230_.webp', 'https://img.alicdn.com/imgextra/i1/54416300/TB25S.qxvuSBuNkHFqDXXXfhVXa_!!0-saturn_solar.jpg_230x230_.webp', 'https://img.alicdn.com/imgextra/i4/10846260/O1CN018S6prR1w77uMXbWCs_!!0-saturn_solar.jpg_230x230_.webp','https://img.alicdn.com/imgextra/i2/125984714/TB2LBX6d4TpK1RjSZFGXXcHqFXa_!!0-saturn_solar.jpg_230x230_.webp']
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
