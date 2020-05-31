<config>
  {
    'enablePullDownRefresh': true,
    'navigationBarTitleText': '购物车',
  }
</config>
<template>
  <div class="shopping-car-wrap">
    <div v-if="dataList.length > 0" style="padding-bottom: 110rpx">
      <div class="color_156 ml_20 fontsize_26">共{{totalCount}}件宝贝即将与您见面</div>
      <div
      class="shopping-wrap"
      v-for="(item, ind) in dataList"
      :key="ind"
      >
        <div class="flex align_center">
          <radio :checked="item.isChecked" color="#ff4e00" style="zoom:.8" @click="checkedCurrent(item)" />
          <div class="justify_between">
            <div style="width:200rpx;height:200rpx" class="flex_shrink">
              <img :src="item.url" style="border-radius: 25rpx;width:100%;height:100%">
            </div>
            <div class="ml_20 flex_column justify_between flex-grow">
              <div style="width:400rpx" class="text-ellipsis">{{item.name}}</div>
              <div>
                <div class="justify_between">
                  <div class="color_156">X{{item.count}}</div>
                  <i @click="deleteShopping(item)" class="icon_delete" />
                </div>
                <div class="mt_20 justify_between">
                  <div class="color_ff4">￥{{item.price}}</div>
                  <div class="justify_end">
                    <i class="icon_jianhao" @click="removeNums(item)" />
                    <div class="cal-num">{{item.count}}</div>
                    <i class="icon_jiahao" @click="addNums(item)" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="shoppign-car-bottom" :style="{ 'padding-bottom': isX ? '60rpx' : ''}">
        <div class="flex align_center" @click="checkedAll">
          <radio :checked="checkAll" color="#ff4e00" style="zoom:.8"/>
          <span class="fontsize_26">全选</span>
        </div>
        <div class="flex align_center fontsize_26">
          合计:<span class="color_ff4">￥{{totalPrice}}</span>
          <div @click="settle()" class="ml_10 t-button t-button-primary">结算</div>
        </div>
      </div>
    </div>
    <div v-else>
      <img style="width:100%" src="http://hbimg.b0.upaiyun.com/e1b1467beea0a9c7d6a56b32bac6d7e5dcd914f7c3e6-YTwUd6_fw658">
      <div class="justify_center mt_40 fontsize_26 color_156">购物车空空如也~</div>
    </div>
  </div>
</template>

<script>
import { setOrder, setBill, updateBalance } from '../../utils/aboutPay.js'
export default {
  data () {
    return {
      init: true, // 控制第一次进入购物车选中数组
      isX: Megalo.getStorageSync('iphoneX'),
      checkAll: false,
      dataList: [],
      checkGoods: [], //  存放选中的多商品
      totalCount: undefined,
      totalPrice: 0,
      pageNo: 0,
      pageSize: 20,
      stopLoad: false,
      isEmpty: false
    }
  },
  onPullDownRefresh () {
    this.getData()
    wx.stopPullDownRefresh()
  },
  onShow () {
    wx.showLoading({
      title: '拼命加载中'
    })
    this.getData()
    this.getCount()
  },
  methods: {
    getCount () {
      this.$db.collection('shoppingCar').count().then(res => {
        this.totalCount = res.total
      })
    },
    getData () {
      wx.cloud.callFunction({
        name: 'getShoppingCar',
        data: {
          openid: Megalo.getStorageSync('openid')
        },
        success: res => {
          this.dataList = res.result.data
          let flag = 0 // 0全选
          this.dataList.map(e => {
            if (e.isChecked === true) {
              ++flag
              if (this.init) {
                this.checkGoods.push(e)
              }
            }
          })
          this.init = false
          if (flag === this.totalCount) {
            this.checkAll = true
          } else {
            this.checkAll = false
          }
          this.getTotalPrice()
          wx.hideLoading()
        }
      })
    },
    getTotalPrice () {
      let sum = 0
      this.dataList.map(e => {
        if (e.isChecked === true) {
          sum += e.price * e.count
          this.totalPrice = sum.toFixed(2)
        } else {
          this.totalPrice = sum === 0 ? sum : sum.toFixed(2)
        }
      })
    },
    checkedAll () {
      wx.showLoading({
        title: '加载中'
      })
      let flag = 0 // 0全选
      this.dataList.map(e => {
        if (e.isChecked === false) {
          return ++flag
        }
      })
      if (flag !== 0) {
        this.$db.collection('shoppingCar').where({
          isChecked: false
        }).update({
          data: {
            isChecked: true
          },
          success: _ => {
            this.getData()
            this.checkAll = true
          }
        })
      } else {
        this.$db.collection('shoppingCar').where({
          isChecked: true
        }).update({
          data: {
            isChecked: false
          },
          success: _ => {
            this.getData()
            this.checkAll = false
          }
        })
      }
    },
    checkedCurrent (row) {
      wx.showLoading({
        title: '加载中'
      })
      // md 面向数据库编程= =
      this.$db.collection('shoppingCar').where({
        _id: row._id
      }).update({
        data: {
          isChecked: !row.isChecked
        },
        success: _ => {
          this.getData()
          // 全选后单个取消选中 全选按钮状态改变 ***
          let flag = 0 // 0全选
          this.dataList.map(e => {
            if (e.isChecked === false) {
              return ++flag
            }
          })
          if (flag !== this.dataList.length) {
            this.checkAll = false
          }
          // ***
          // 多个商品结算 ***
          if (!row.isChecked) {
            this.checkGoods.push(row)
          } else {
            for (let i = 0; i < this.checkGoods.length; i++) {
              if (this.checkGoods[i].name === row.name) {
                this.checkGoods.splice(i, 1)
              }
            }
          }
          // ***
        }
      })
      this.getTotalPrice()
    },
    deleteShopping (row) {
      this.$db.collection('shoppingCar').where({
        _id: row._id
      }).remove().then(_ => {
        wx.showToast({
          title: '删除商品成功',
          success: _ => {
            this.getData()
            this.getCount()
          }
        })
      })
    },
    removeNums (row) {
      if (row.count > 1) {
        wx.showLoading({
          title: '加载中'
        })
        this.$db.collection('shoppingCar').where({
          _id: row._id
        }).update({
          data: {
            count: --row.count
          },
          success: _ => {
            this.getData()
          }
        })
      }
    },
    addNums (row) {
      if (row.count <= 999) {
        wx.showLoading({
          title: '加载中'
        })
        this.$db.collection('shoppingCar').where({
          _id: row._id
        }).update({
          data: {
            count: ++row.count
          },
          success: _ => {
            this.getData()
          }
        })
      }
    },
    settle () {
      let nowBalance
      this.$db.collection('userInfo').where({
        _openid: Megalo.getStorageSync('openid')
      }).get({
        success: res => {
          nowBalance = res.data[0].balance
          if (nowBalance >= this.totalPrice) {
            for (let i = 0; i < this.checkGoods.length; i++) {
              let price = this.checkGoods[i].price * this.checkGoods[i].count
              setOrder(this.checkGoods[i], price)
              setBill(this.checkGoods[i], 'goods', price)
              this.$db.collection('shoppingCar').where({
                _id: this.checkGoods[i]._id
              }).remove()
            }
            updateBalance(-this.totalPrice)
            wx.showToast({
              title: '结算成功'
            })
            this.getData()
          } else {
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
    }
  }
}
</script>

<style lang='scss'>
page {
  background: #F4F4F4;
  padding-top: 20rpx;
}
.shopping-car-wrap {
  .shopping-wrap {
    margin: 20rpx;
    border-radius: 20rpx;
    background: #fff;
    padding: 20rpx;
  }
  .cal-num {
    margin: 0 10rpx;
    font-size: 35rpx;
  }
  .shoppign-car-bottom {
    position: fixed;
    bottom: 0px;
    width: calc(100% - 40px);
    background: #fff;
    padding: 20rpx;
    display: flex;
    justify-content: space-between;
  }
}
</style>
