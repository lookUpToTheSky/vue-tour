import { HTTP } from '../utils/http.js'
class AddressModel extends HTTP{
  constructor () {
    super()
    this.storageName = 'address'
  }
  //从本地获取地址
  getAddress () {
    return wx.getStorageSync(this.storageName)
  }
  //保存添加地址
  setAddress(address) {
    wx.showToast({
      title: '修改地址成功',
    })
    return wx.setStorageSync(this.storageName, address)
  }
  //从数据库获取地址
  getAddressFromSever(token) {
    return this.request({
      url: 'api/address',
      header: {token}
    })
  }
  //保存到数据库
  setAddressToSever (token, userInfo, address) {
    return this.request({
      url: 'api/address',
      method: 'POST',
      header: { token },
      data: {
        name: userInfo.userName,
        address: address,
       phone: userInfo.telNumber,

      }
    })
  }
  //编辑用户收货地址
  editorUserInfo(res) {
    let userAddress = res.provinceName + res.cityName + res.countyName + res.detailInfo
    const provinceList = ['北京市', '上海市', '天津市', '重庆市']
    let address = null
    if (provinceList.indexOf(res.provinceName)) {
      userAddress = res.provinceName + res.countyName + res.detailInfo
    }
    address={
      userInfo: {
        name:res.userName,
        phone:res.telNumber
      },
      address: userAddress
    }
    this.setAddress(address)
    return address
  }
}
export {AddressModel}