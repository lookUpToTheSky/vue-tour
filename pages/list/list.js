import {ListModel} from '../../model/list.js'
let listModel = new ListModel()
Page({
  //页面的初始数据
  data: {
    goodsList: null,
    categoryList: null,
    sortField: 'goods_id',
    sortType: 'desc',
    keyword: '',
    minprice: 0,
    maxPrice: 0,
    warnShow: false,
    filterShow: false,
    showCategory: true,
    cat_id: 0,
    totalpages: 0,
    page: 1,
    count: 6
  },
  //隐藏分类
  hideCategory (e) {
    this._goodsCategory (e)
    this.setData({
      showCategory: true
    })
  },
  //显示分类
  showCategory() {
    this.setData({
      showCategory: false
    })
  },
  //商品分类
  _goodsCategory (e) {
    this.setData({
      keyword: ''
    })
    let cat_id = e.detail.cat_id
    if (cat_id >= 0){
      if(cat_id ==0) {
        this.setData({
          minprice: 0,
          maxPrice: 0
        })
      }
      this.setData({
        cat_id: cat_id,
        goodsList: null,
        page: 1
      })
      this._getAllGoods(this.data.page, this.data.count, cat_id, this.data.sortField, this.data.sortType, this.data.keyword)
    }
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '全部商品'
    })
    this._init(options.keyword)
    this._getTotalCount()
    this._getCategory()
  },
  //页面初始化
  _init(keyword) {
    if (keyword) {
      this.search(keyword)
    } else {
      this._getAllGoods(this.data.page, this.data.count, this.data.cat_id, this.data.sortField, this.data.sortType)
    }
  },
  //获取商品
  _getAllGoods(page, count, cat_id, sortField, sortType, keyword='', minPrice, maxPrice) {
    listModel.getAllGoods({
      page,
      count,
      cat_id,
      sortField,
      sortType,
      keyword,
      minPrice,
      maxPrice
    }).then(res => {
      let goods = this.data.goodsList
      let result = res.data.data.goods
      if (result) {
        if (goods) {
          result.forEach(item => {
            goods.push(item)
          })
          this.setData({
            goodsList: goods
          })
        } else {
          this.setData({
            goodsList: result
          })
        }
      }
      this._noSearchGoods()
    })
  },
  //没有搜索到数据
  _noSearchGoods () {
    if (!this.data.goodsList.length) {
      this.setData({
        warnShow: true
      })
    } else {
      this.setData({
        warnShow: false
      })
    }
  },
  //获取商品数量
  _getTotalCount () {
    listModel.getGoodsCount().then(res => {
      let pages = Math.ceil(res.data.data / this.data.count)
      this.setData({
        totalpages: pages
      })
    })
  },
  //获取分类列表
  _getCategory () {
    listModel.getGoodsCategory().then(res => {
      this.setData({
        categoryList: res.data.data
      })
    })
  },
  // 页面上拉触底事件的处理函数
  onReachBottom: function () {
    let page = this.data.page + 1
    if (page <= this.data.totalpages) {
      this.setData({
        page: page
      })
      this._getAllGoods(this.data.page, this.data.count, this.data.cat_id, this.data.sortField, this.data.sortType, this.data.keyword, this.data.minPrice,
        this.data.maxPrice)
    }    
  },
  //点击商品排序
  onGoodsSort (e) {
    let sortField = e.target.dataset.sort
    if (sortField === 'goods_price' || sortField === 'sale_num' ) {
      this.setData({
        sortType: this.data.sortType === 'desc' ? 'asc' : 'desc'
      })
      this._sortWay(sortField)
    }else if(sortField != this.data.sortField){
      this._sortWay(sortField)
    }
  },
  _sortWay(sortField) {
    this.setData({
      sortField: sortField,
      page: 1,
      goodsList: null
    })
    this._getAllGoods(this.data.page, this.data.count, this.data.cat_id, this.data.sortField, this.data.sortType, this.data.keyword)
  },
  //关键字搜索商品
  search(e) {
    const keyword = e.detail ?e.detail.value:e
      this.setData({
        keyword: keyword,
        goodsList: null,
        page: 1
     })
    this._getAllGoods(
      this.data.page, 
      this.data.count, 
      this.data.cat_id, 
      this.data.sortField, 
      this.data.sortType, 
      this.data.keyword
    )
  },
  //显示筛选
  onFliter() {
    this.setData({
      filterShow: true
    })
  },
  //价格筛选
  filterPrice (e) {
    const price = e.detail
    this.setData({
      minPrice: price.minPrice,
      maxPrice: price.maxPrice,
      filterShow: false
    })
    if(price.minPrice >0 || price.maxPrice >0){
      if(price.maxPrice > price.minPrice){
        this.setData({
          goodsList: null,
          page: 1
        })
        this._getAllGoods(
          this.data.page,
          this.data.count,
          this.data.cat_id,
          this.data.sortField,
          this.data.sortType,
          this.data.keyword,
          this.data.minPrice,
          this.data.maxPrice
        )
      }
    } 
  }
})