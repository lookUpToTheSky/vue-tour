// pages/comment/comment.js
import {DetailModel} from '../../model/detail.js'
let detailModel = new DetailModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment: null,
    total: 0,
    start: 0,
    count: 8,
    goods_id: 0,
    totalTimes: 1,
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const goods_id = options.goods_id
    this.setData({
      goods_id: goods_id
    })
    this._getCommentDetai(goods_id,this.data.start, this.data.count)
  },  
  //获取评论详情
  _getCommentDetai(goods_id, start, count) {
    detailModel.getComment(goods_id, start, count).then(res=>{
      let comment = this.data.comment
      let result = res.data.data
      if(this.data.totalTimes > 1){
        result.comment.forEach(item =>{
          comment.push(item)
        })
        this.setData({
          comment: comment,
        })
      }else{
        this.setData({
          comment: result.comment,
          total: result.total
        })
      }
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.total > this.data.start){
      const times = Math.ceil(this.data.total / this.data.count)
      const start = this.data.count * this.data.totalTimes
      const totalTimes = this.data.totalTimes + 1
      this.setData({
        totalTimes: totalTimes,
        start: start
      })
      if (totalTimes <= times) {
        this._getCommentDetai(this.data.goods_id, this.data.start, this.data.count)
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})