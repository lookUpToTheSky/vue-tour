// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
data: {
  imgList: [
    'http://img0.imgtn.bdimg.com/it/u=24476680,2394022832&fm=26&gp=0.jpg', 
   'http://img2.imgtn.bdimg.com/it/u=181331400,4052035088&fm=26&gp=0.jpg', 
   'http://img3.imgtn.bdimg.com/it/u=3920193545,3976251098&fm=26&gp=0.jpg',
   'http://img2.imgtn.bdimg.com/it/u=3393566404,2946455918&fm=11&gp=0.jpg',
   'http://img0.imgtn.bdimg.com/it/u=1502096658,1104092262&fm=26&gp=0.jpg'
    ],
  swiperList: null,
  hotList: [{
    id: 1,
    name: '金毛幼犬',
    price: '1000',
    hotNum: '886',
    img: 'http://img0.imgtn.bdimg.com/it/u=24476680,2394022832&fm=26&gp=0.jpg'
  }, {
      id: 2,
      name: '拉布拉多',
      price: '1200',
      hotNum: '766',
      img: 'http://img2.imgtn.bdimg.com/it/u=181331400,4052035088&fm=26&gp=0.jpg'
    }, {
      id: 3,
      name: '可爱博美',
      price: '1000',
      hotNum: '856',
      img: 'http://img3.imgtn.bdimg.com/it/u=3920193545,3976251098&fm=26&gp=0.jpg'
    }, {
      id: 4,
      name: '金毛成犬',
      price: '2000',
      hotNum: '516',
      img: 'http://img2.imgtn.bdimg.com/it/u=3393566404,2946455918&fm=11&gp=0.jpg'
    }, {
      id: 5,
      name: '进口博美',
      price: '1000',
      hotNum: '689',
      img: 'http://img0.imgtn.bdimg.com/it/u=1502096658,1104092262&fm=26&gp=0.jpg'
    }, {
      id: 6,
      name: '迷你犬',
      price: '1500',
      hotNum: '586',
      img: 'http://img2.imgtn.bdimg.com/it/u=3302739227,582881985&fm=26&gp=0.jpg'
    }, {
      id: 7,
      name: '纯正二哈',
      price: '998',
      hotNum: '886',
      img: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3147146028,1278933774&fm=15&gp=0.jpg'
    }, {
      id: 8,
      name: '哈巴狗',
      price: '500',
      hotNum: '986',
      img: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1277284336,1893243096&fm=15&gp=0.jpg'
    }, {
      id: 9,
      name: '纯正蝴蝶犬',
      price: '2000',
      hotNum: '686',
      img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3624779171,1827296100&fm=26&gp=0.jpg'
    },{id: 10,
    name: '小柯基',
    price: '1800',
    hotNum: '506',
      img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1561151436,720013885&fm=26&gp=0.jpg'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
onLoad: function (options) {
  wx.request({
    url: 'http://www.2yue.cc/api/swiper',
    header: {        appkey:"f68bSYqte0m6EibwhARrzTcYDPoV0FobCi06uDfM3eF4QGQQKSywmd71ytM"
    },
    success: res => {
      const error_code = res.data.error_code
      if (error_code === 0) {

        let swiperList = []
        res.data.data.forEach((item)=>{
          swiperList.push(item.img)
        })
        this.setData({
          swiperList: swiperList
        })
      }else{
        wx.showToast({
          title: res.data.error_msg,
          duration: 2000
        })
      }
    }
  })

},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
onShow: function () {

},

  /**
   * 生命周期函数--监听页面隐藏
   */
onHide: function () {

},

  /**
   * 生命周期函数--监听页面卸载
   */
onUnload: function () {

},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
onPullDownRefresh: function () {
},

  /**
   * 页面上拉触底事件的处理函数
   */
onReachBottom: function () {
},

  /**
   * 用户点击右上角分享
   */
onShareAppMessage: function () {

}
})