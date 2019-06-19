class CartModel {
  constructor () {
    this.cartStorageName = 'cartList'
  }
  //获取购物车数据
  getCartData () {
    let cart = wx.getStorageSync(this.cartStorageName)
    if (!cart) {
      cart = []
    }
    return cart
  }
  //获取购物车商品总数
  getCartCount (selected=false) {
    let count = 0
    let cartData = this.getCartData ()
      cartData.forEach(item =>{
        if(!selected){
          count += item.goods_buyNum
        }else{
          if(item.goods_selected){
            count += item.goods_buyNum
          }
        }
      })
      return count
  }
  //加入购物车
  addCart (goods) {
    return new Promise((reslove, reject)=>{
      reslove()
      let cartData = this.getCartData()
      let goodsIndex = this.hasGoods(goods)
      if (goodsIndex.index > -1) {
        let cart = cartData[goodsIndex.index]
        const totalNum = cart.goods_buyNum + goods.goods_buyNum
        if (totalNum > goods.goods_maxBuyNum){
          cart.goods_buyNum = goods.goods_maxBuyNum
          wx.showToast({
            icon:'none',
            title: `本商品限购${goods.goods_maxBuyNum}`,
          })
        }else{
          cart.goods_buyNum += goods.goods_buyNum
        }   
      }else {
        cartData.push(goods)
      }
      wx.setStorageSync(this.cartStorageName, cartData)
    })
  } 
  //商品是否存在购物车
  hasGoods (goods) {
    let result = {index: -1}
    const cartList = this.getCartData()
    if(cartList) {
      cartList.forEach((item, index) => {
        if (item.goods_id === goods.goods_id) {
          result = {index: index, goods: item}
        }
      })
    }
    return result
  }
  //改变购物车商品购买数量
  changeCartBuyNum (goods_id, type, buyNum=0) {
    let cartList = this.getCartData()
    cartList.forEach((item, index) =>{
      if (item.goods_id === goods_id){
        if (type == 'reduce' 
        && cartList[index].goods_buyNum >1){
          cartList[index].goods_buyNum--
        }
        if (type == 'increase' 
        && cartList[index].goods_buyNum < cartList[index].goods_maxBuyNum ) {
          cartList[index].goods_buyNum++
        }
        if(type == 'change'){
          cartList[index].goods_buyNum = buyNum
        }
      }
    })
    wx.setStorageSync(this.cartStorageName, cartList)
  }
  //改变商品选中状态
  selectStatus (goods_id) {
    let cartList = this.getCartData()
    cartList.forEach((item, index) =>{
      if(item.goods_id == goods_id){
        cartList[index].goods_selected = !cartList[index].goods_selected
      }
    })
    wx.setStorageSync(this.cartStorageName, cartList)
  }
  //全选商品
  selectedAll (selectedAll) {
    let cartList = this.getCartData()
    cartList.forEach((item, index) => {
      cartList[index].goods_selected = selectedAll
    })
    wx.setStorageSync(this.cartStorageName, cartList)
  }
  //获取选中商品价格总计
  getSelectedTotal () {
    let cartList = this.getCartData() 
    let count = 0
    cartList.forEach((item, index) => {
      if(item.goods_selected){
        count += item.goods_price*item.goods_buyNum
      }
    })
    return count.toFixed(2)
  }
  //删除商品
  deleteGoods (goods_id) {
    
    let cartList = this.getCartData()
    cartList.forEach((item, index) =>{
      if(item.goods_id === goods_id){
        cartList.splice(index, 1)
      }
    })
    wx.setStorageSync(this.cartStorageName, cartList)
  }
  //清空购物车
  clearCart () {
    wx.setStorageSync(this.cartStorageName, null)
  }
}
export {CartModel}