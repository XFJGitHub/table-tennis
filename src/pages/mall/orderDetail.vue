<config>
  {
    'navigationBarTitleText': '订单详情'
  }
</config>
<template>
  <div>
    <div class="block-max-wrap">
      <div class="mt_20 justify_end">
        <div @click="cancelOrder" v-if="goods.orderType === 1" class="fontsize_28">取消订单</div>
      </div>
      <div class="color_fff mt_20 fontsize_40 font_bold">{{goods.orderStatus}}</div>
      <div class="content-wrap" :style="{height: goods.sType === '自提' ? '900rpx' : ''}">
        <div v-if="goods.sType === '送货上门'" class="p_30 fontsize_28 border_bottom">
          <div class="font_bold fontsize_36">收货人信息</div>
          <div class="justify_between mt_20">
            <div class="color_156">收货人姓名</div>
            <div>{{goods.sName}}</div>
          </div>
          <div class="justify_between">
            <div class="color_156">联系方式</div>
            <div>{{goods.sPhone}}</div>
          </div>
          <div class="justify_between">
            <div class="color_156 flex_shrink" style="width:170rpx">收货地址</div>
            <div>{{goods.sAddress}}</div>
          </div>
        </div>

        <div class="p_30 fontsize_28 border_bottom">
          <div class="font_bold fontsize_36">商品信息</div>
          <div class="mt_40 flex">
            <div style="width:200rpx;height:200rpx" class="flex_shrink">
              <img :src="goods.url" style="border-radius: 25rpx;width:100%;height:100%">
            </div>
            <div class="ml_10 flex_column justify_between flex-grow">
              <div>{{goods.name}}</div>
              <div>
                <div class="justify_end color_156">X{{goods.count}}</div>
                <div class="justify_end color_ff4">￥{{goods.price}}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="p_30 fontsize_28">
          <div class="font_bold fontsize_36">订单信息</div>
          <div class="justify_between mt_20">
            <div class="color_156">订单编号</div>
            <div>{{goods.orderId}}</div>
          </div>
          <div class="justify_between mt_20">
            <div class="color_156">下单时间</div>
            <div>{{goods.time}}</div>
          </div>
          <div class="justify_between">
            <div class="color_156">支付方式</div>
            <div>线上支付</div>
          </div>
        </div>
      </div>
    </div>
    <div @click="pay" v-if="goods.orderType === 1" class="orderDetail-bottom">
      立即支付
    </div>
  </div>
</template>

<script>
import { setBill } from '../../utils/aboutPay.js'
export default {
  data () {
    return {
      goods: {}
    }
  },
  methods: {
    getData (options) {
      this.$db.collection('orderList').where({
        _id: options._id
      }).get({
        success: res => {
          this.goods = res.data[0]
        }
      })
    },
    cancelOrder () {
      this.$db.collection('orderList').where({
        _id: this.goods._id
      }).remove({
        success: res => {
          wx.navigateBack({
            delta: 1
          })
        }
      })
    },
    pay () {
      let nowBalance
      this.$db.collection('userInfo').where({
        _openid: Megalo.getStorageSync('openid')
      }).get({
        success: res => {
          nowBalance = res.data[0].balance
          this.$db.collection('userInfo').where({
            _openid: Megalo.getStorageSync('openid')
          }).update({
            data: {
              balance: nowBalance - this.goods.price
            },
            success: _ => {
              setBill(this.goods, 'goods', this.goods.price)
              wx.showToast({
                title: '支付成功',
                success: _ => {
                  this.$db.collection('orderList').where({
                    _id: this.goods._id
                  }).update({
                    data: {
                      orderStatus: '已完成',
                      orderType: 0
                    },
                    success: _ => {
                      this.getData(this.goods)
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  },
  onLoad (options) {
    this.getData(options)
  }
}
</script>

<style lang='scss'>
page {
  background: #F4F4F4;
  .block-max-wrap {
    background: linear-gradient(to right bottom, #ff504d, #ff9442);
    height: 400rpx;
    padding: 20rpx;
    .content-wrap {
      position: relative;
      top: 70rpx;
      background: #fff;
      padding: 10rpx;
      border-radius: 25rpx;
    }
  }
  .orderDetail-bottom {
    background: linear-gradient(to right, #ff9442,  #ff504d);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0px;
    color: #fff;
    height:100rpx;
  }
}
</style>
