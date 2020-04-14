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

    <div class="goods-bottom">
      <div class="">
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
      goodsNum: 1
    }
  },
  computed: {
    totalMoney () {
      return this.goodsNum * this.dataList.price
    }
  },
  methods: {
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

    },
    buy () {
      wx.showModal({
        content: `需要支付总金额为￥${this.totalMoney}`,
        success: res => {
          if (res.confirm) {
          }
        }
      })
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
