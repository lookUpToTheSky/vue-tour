import {HTTP} from '../utils/http.js'
class DetailModel extends HTTP {
  getGoods (goods_id) {
    return this.request ({
      url: 'api/goods',
      data: {goods_id}
    })
  }
  getComment(goods_id, start, count) {
    return this.request({
      url: 'api/get_comment',
      data: { goods_id, start, count }
    })
  }
}
export {DetailModel}