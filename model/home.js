import { HTTP } from '../utils/http.js'
class HomeModel extends HTTP{
  //获取轮播图
  getSwiper () {
  return this.request({
      url: 'api/swiper'
    })
  }
  //获取热卖品
  getHotGoods(data) {
    return this.request({
      url:'api/goods_list',
      data: data
    })
  }
  //获取热买商品总数
  getGoodsCount() {
    return this.request({
      url:'api/goods_count'
    })
  }
}
export {HomeModel}