/* eslint-disable */
const date = new Date()
const year = date.getFullYear()
const month = (date.getMonth() + 1)
const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
const ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()

export const setOrder = (goods, price) => {
    console.log(goods)
    console.log(price)
    const db = wx.cloud.database()
    db.collection('orderList').add({
        data: {
            name: goods.name,
            orderId: `2020${Math.ceil(Math.random() * 10000)}`,
            orderStatus: '已完成',
            orderType: 0,
            price: price,
            count: goods.count,
            sName: goods.sName,
            sAddress: goods.sAddress,
            sPhone: goods.sPhone,
            sType: goods.sType,
            url: goods.url,
            time: `${year}-${month < 10 ? '0' + month : month}-${day} ${hour}:${minutes}:${ss}`
        },
        fail: err => {
            console.log(err, 123)
        }
    })
}
export const setBill = (goods, type, price) => {
    const db = wx.cloud.database()
    db.collection('billList').add({
        data: {
          name: goods.name,
          isIncome: false,
          _type: type,
          price: price,
          url: goods.url,
          time: `${month}月${day}日 ${hour}:${minutes}:${ss}`
        },
        fail: err => {
            console.log(err)
        }
    })
}
export const updateBalance = (totalPrice) => {
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('userInfo').where({
        _openid: Megalo.getStorageSync('openid')
    }).update({
        data: {
            balance: _.inc(totalPrice)
        }
    })
}