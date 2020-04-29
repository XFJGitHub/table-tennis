<config>
  {
    'navigationBarTitleText': '商品详情',
    "usingComponents": {}
  }
</config>
<template>
  <div class="goods-detail">
    <swiper
      style="line-height:50rpx;width:100%;height:600rpx"
      indicator-dots="true"
      current
    >
      <swiper-item v-for="(item, index) in dataList.url" :key="index">
        <img style="width:100%;height:600rpx" :src="item">
      </swiper-item>
    </swiper>
    <div class="goods-content_wrap">
      <div class="goods-name">{{dataList.name}}</div>
      <div class="goods-price">￥{{dataList.price}}</div>
      <div class="justify_end">
        <i class="icon_jianhao" @click="removeNums" />
        <div class="cal-num">{{goodsNum}}</div>
        <i class="icon_jiahao" @click="addNums" />
      </div>
    </div>

    <div class="mx_40 pt_20" style="margin-top:-40rpx;border-top:1px solid #e5e5e5">
      <radio-group @change="radioChange">
        <radio
          style="zoom:.8"
          class="mr_20"
          v-for="(item, ind) in radioList"
          :key="ind"
          :value="item.id"
          :checked="item.checked"
          color="#6666FF"
        >
          <text>{{item.name}}</text>
        </radio>
      </radio-group>
      <template v-if="toHouse">
        <div class='flex mt_20 fontsize_30'>
          <div style="width: 200rpx;">收货人</div>
          <input type="text" placeholder="请输入收货人姓名" v-model="sName">
        </div>
        <div class='flex fontsize_30'>
          <div style="width: 200rpx">收货地址</div>
          <input type="text" placeholder="请输入收货地址" v-model="sAddress">
        </div>
        <div class='flex fontsize_30'>
          <div style="width: 200rpx">联系方式</div>
          <input type="text" placeholder="请输入收货人联系方式" v-model="sPhone">
        </div>
      </template>
    </div>

    <div class="goods-bottom">
      <div>
        共计金额<span class="color_ff4">￥{{totalMoney}}</span>
      </div>
      <div class="flex">
        <div @click="joinShoppingCar" class="button left-button">加入购物车</div>
        <div @click="buy" class="button right-button">立即购买</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataList: {},
      goodsNum: 1,
      toHouse: false,
      sName: '',
      sAddress: '',
      sPhone: '',
      radioList: [
        {
          id: 0,
          name: '自提',
          checked: true
        },
        {
          id: 1,
          name: '送货上门'
        }
      ]
    }
  },
  computed: {
    totalMoney () {
      return this.goodsNum * this.dataList.price
    }
  },
  methods: {
    radioChange (e) {
      e.detail.value === '1' ? this.toHouse = true : this.toHouse = false
    },
    getData (id) {
      const db = wx.cloud.database()
      db.collection('goods').where({
        _id: id
      }).get({
        success: res => {
          this.dataList = res.data[0].goodsDetail
        }
      })
    },
    removeNums () {
      if (this.goodsNum > 0) {
        this.goodsNum--
      }
    },
    addNums () {
      if (this.goodsNum <= 999) {
        this.goodsNum++
      }
    },
    joinShoppingCar () {
      if (!Megalo.getStorageSync('openid')) {
        wx.showToast({
          title: '您还没有登录，即将跳转到登录页面',
          icon: 'none',
          duration: 2500,
          success: _ => {
            setTimeout(_ => {
              wx.switchTab({
                url: '/pages/my/my'
              })
            }, 2000)
          }
        })
      } else {
        if (this.toHouse === true && !this.sAddress && !this.sPhone && !this.sName) {
          wx.showToast({
            title: '收货人、收货地址和联系方式必须要填',
            icon: 'none'
          })
        } else {
          this.$db.collection('shoppingCar').add({
            data: {
              name: this.dataList.name,
              price: this.dataList.price,
              count: this.goodsNum,
              url: this.dataList.url[0],
              isClosed: false
            },
            success: _ => {
              wx.showToast({
                title: '加入购物车成功'
              })
            }
          })
        }
      }
    },
    buy () {
      if (!Megalo.getStorageSync('openid')) {
        wx.showToast({
          title: '您还没有登录，即将跳转到登录页面',
          icon: 'none',
          success: _ => {
            setTimeout(_ => {
              wx.switchTab({
                url: '/pages/my/my'
              })
            }, 1500)
          }
        })
      } else {
        if (this.toHouse === true && !this.sAddress && !this.sPhone && !this.sName) {
          wx.showToast({
            title: '收货人、收货地址和联系方式必须要填',
            icon: 'none'
          })
        } else {
          wx.showModal({
            content: `需要支付总金额为￥${this.totalMoney}`,
            success: res => {
              const date = new Date()
              const year = date.getFullYear()
              const month = (date.getMonth() + 1)
              const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
              const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
              const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
              const ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
              let nowBalance
              if (res.confirm) {
                this.$db.collection('userInfo').where({
                  _openid: Megalo.getStorageSync('openid')
                }).get({
                  success: res => {
                    nowBalance = res.data[0].balance
                    if (nowBalance >= this.totalMoney) {
                      // 生成订单
                      this.$db.collection('orderList').add({
                        data: {
                          name: this.dataList.name,
                          orderId: `2020${Math.ceil(Math.random() * 10000)}`,
                          orderStatus: '已完成',
                          orderType: 0,
                          price: this.totalMoney,
                          count: this.goodsNum,
                          sName: this.sName,
                          sAddress: this.sAddress,
                          sPhone: this.sPhone,
                          sType: this.toHouse ? '送货上门' : '自提',
                          url: this.dataList.url[0],
                          time: `${year}-${month < 10 ? '0' + month : month}-${day} ${hour}:${minutes}:${ss}`
                        },
                        success: res => {
                          // 付钱
                          this.$db.collection('userInfo').where({
                            _openid: Megalo.getStorageSync('openid')
                          }).update({
                            data: {
                              balance: nowBalance - this.totalMoney
                            },
                            success: _ => {
                              wx.showToast({
                                title: '支付成功',
                                duration: 3000,
                                success: _ => {
                                  // 生成账单
                                  this.$db.collection('billList').add({
                                    data: {
                                      name: this.dataList.name,
                                      isIncome: false,
                                      _type: 'goods',
                                      price: this.totalMoney,
                                      url: this.dataList.url[0],
                                      time: `${month}月${day}日 ${hour}:${minutes}:${ss}`
                                    }
                                  })
                                  setTimeout(_ => {
                                    wx.navigateTo({
                                      url: '/pages/mall/orderList'
                                    })
                                  }, 2000)
                                }
                              })
                            }
                          })
                        }
                      })
                    } else {
                      console.log(nowBalance)
                      wx.showToast({
                        title: '很抱歉您的余额不足，请前往充值',
                        icon: 'none',
                        success: _ => {
                          wx.navigateTo({
                            url: '/pages/my/recharge'
                          })
                        }
                      })
                    }
                  }
                })
              } else if (res.cancel) {
                this.$db.collection('orderList').add({
                  data: {
                    name: this.dataList.name,
                    orderId: `2020${Math.ceil(Math.random() * 1000)}`,
                    orderStatus: '待付款',
                    orderType: 1,
                    count: this.goodsNum,
                    sName: this.sName,
                    sAddress: this.sAddress,
                    sPhone: this.sPhone,
                    sType: this.toHouse ? '送货上门' : '自提',
                    price: this.totalMoney,
                    url: this.dataList.url[0],
                    time: `${year}-${month}-${day} ${hour}:${minutes}:${ss}`
                  }
                })
                wx.showToast({
                  title: '支付失败，请尽快前往支付',
                  icon: 'none',
                  success: _ => {
                    setTimeout(_ => {
                      wx.redirectTo({
                        url: '/pages/mall/orderList'
                      })
                    }, 1000)
                  }
                })
              }
            }
          })
        }
      }
    }
  },
  onLoad (options) {
    this.getData(options.goodsId)
  }
}
</script>

<style lang='scss'>
.goods-detail {
  .img-wrap {
    width: 400rpx;
    height: 600rpx;
    margin-top: 100rpx;
    box-shadow:0 10px 10px rgb(122, 122, 122);
  }
  .goods-content_wrap {
    border-radius: 40rpx 40rpx 0 0;
    padding: 40rpx;
    background: #fff;
    position: relative;
    top: -40rpx;
    .goods-name {
      font-size: 35rpx;
      font-weight: bold;
    }
    .goods-price {
      color: #FF4E00;
      font-size: 35rpx;
      font-weight: bold;
      margin-top: 20rpx;
    }
    .cal-num {
      margin: 0 10rpx;
      font-size: 35rpx;
    }
  }
  .goods-bottom {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #e5e5e5;
    position: fixed;
    bottom: 0;
    padding: 20rpx;
    padding-bottom: 40rpx;
    .button {
      background: #3399FF;
      color: #fff;
      padding: 16px 40px;
      font-size: 28rpx;
    }
    .left-button {
      border-radius: 10rpx 0 0 10rpx;
      margin-right: 4rpx;
    }
    .right-button {
      margin-right: 40rpx;
      border-radius: 0 10rpx 10rpx 0;
    }
  }
}
</style>
