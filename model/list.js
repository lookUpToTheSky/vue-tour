import {HTTP} from '../utils/http.js'
class ListModel extends HTTP{
  //获取全部商品
  getAllGoods(data) {
    return this.request({
      url: 'api/goods_list',
      data: data,
    })
  }
  //获取分类列表
  getGoodsCategory () {
    return this.request({
      url: 'api/goods_category'
    })
  }
  //获取商品数量
  getGoodsCount() {
   return this.request({
      url: 'api/goods_count'
    })
  }
}
export {ListModel}