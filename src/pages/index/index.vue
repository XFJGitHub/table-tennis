<config>
  {
    "usingComponents": {},
    "navigationStyle": 'custom',
    'enablePullDownRefresh': true
  }
</config>
<template>
  <div style="line-height:50px">
    <swiper
      class="index-swiper-wrap"
      :indicator-dots="true"
      :autoplay="true"
      :circular="true"
    >
      <swiper-item v-for="(item, index) in swiperImgs" :key="index">
        <img style="width:100%;height:400rpx" :src="item.url">
      </swiper-item>
    </swiper>
    <div class="index-body-wrap">
      <div class="justify_around">
        <div class="index-icon-wrap" @click="toTabbar(0)">
          <i class="entertainment-center"/>
          <div class="icon-tips">娱乐中心</div>
        </div>
        <div class="index-icon-wrap" @click="toTabbar(1)">
          <i class="vedio-center"/>
          <div class="icon-tips">账单中心</div>
        </div>
        <div class="index-icon-wrap" @click="toTabbar(2)">
          <i class="shopping-center"/>
          <div class="icon-tips">商城中心</div>
        </div>
        <div class="index-icon-wrap" @click="toTabbar(3)">
          <i class="advise-center"/>
          <div class="icon-tips">投诉中心</div>
        </div>
      </div>

      <div class="flex align_center" @click="showNotice">
        <i class="notice" />
        <div class="notice-tips">{{notice}}</div>
      </div>

      <div class="font_bold">发现好物</div>
      <div
        class="flex goods-style"
        v-for="(goods, index) in goodsList" :key="index"
        @click="toGoodsDetails(goods)"
      >
        <img :src="goods.goodsDetail.url[0]" class="goods-img">
        <div class="ml_40 flex-grow">
          <div class="flex_column justify_between h_100">
            <div>
              <div style="width:360rpx" class="goods-title text-ellipsis">{{goods.goodsDetail.name}}</div>
              <div v-if="goods.goodsDetail.tags !== 0" class="goods-tags">包邮</div>
            </div>
            <div class="goods-price">￥{{goods.goodsDetail.price}}</div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      swiperImgs: [],
      notice: '',
      goodsList: []
    }
  },
  methods: {
    getData () {
      const db = wx.cloud.database()
      db.collection('indexData').get({
        success: res => {
          this.notice = res.data[0].notice
          this.swiperImgs = res.data[0].imgList
        }
      })
      wx.cloud.callFunction({
        name: 'getRecommend',
        success: res => {
          this.goodsList = res.result.data
        }
      })
    },
    showNotice () {
      wx.showModal({
        title: '今日公告',
        content: this.notice,
        confirmText: '好的',
        showCancel: false
      })
    },
    toTabbar (num) {
      const url = {
        0: '/pages/billiards/billiards',
        1: '/pages/my/bill',
        2: '/pages/mall/mall',
        3: '/pages/my/advice'
      }
      if (num === 3 || num === 1) {
        wx.navigateTo({
          url: url[num]
        })
      } else {
        wx.switchTab({
          url: url[num]
        })
      }
    },
    toGoodsDetails (val) {
      wx.navigateTo({
        url: `/pages/mall/goodsDetail?goodsId=${val._id}`
      })
    }
  },
  onPullDownRefresh () {
    this.getData()
    wx.stopPullDownRefresh()
  },
  onShow () {
    this.getData()
    // wx.cloud.callFunction({
    //   name: 'demo',
    //   complete: res => {
    //     Megalo.setStorageSync('openid', res.result.openid)
    //   }
    // })
  }
}
</script>

<style lang='scss'>
page {
  padding-bottom: 20rpx;
}
.index-swiper-wrap {
  height: 400rpx;
  width: 100%;
}
.index-body-wrap {
  position: relative;
  top: -60rpx;
  border-radius: 40rpx 40rpx 0 0;
  background: white;
  height: 100vw;
  padding: 40rpx;
  .index-btn-circle {
      border-radius: 50%;
      background: lightgreen;
      width: 50px;
      height: 50px;
  }
}
.notice-tips {
  padding-left: 20rpx;
  font-size: 20rpx;
  color: #000;
  width: 300rpx;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 30rpx;
  animation: marquee 4s infinite linear;
}
@keyframes marquee {
  0% {
    transform: translateX(300rpx);
  }
  100% {
    transform: translateX(0);
  }
}
.goods-style {
  box-shadow: 0 0 10px 6px rgba(0,0,0,0.10);
  border-radius: 14rpx;
  padding: 20rpx;
  margin-bottom: 30rpx;
  display: flex;
  .goods-img {
    border-radius: 40rpx;
    width: 250rpx;
    height: 250rpx;
  }
  .goods-title {
    line-height: 40px;
    font-size: 40rpx;
    font-weight: bold;
    margin-bottom: 20rpx;
  }
  .goods-price {
    line-height: 35rpx;
    font-size: 35rpx;
    color: #FF4E00;
    font-weight: bold;
    display: flex;
    justify-content: flex-end;
  }
  .goods-tags {
    line-height: 30rpx;
    margin-top: 20rpx;
    background: rgba(255, 236, 214, 1.0);
    width: 40rpx;
    color: #f3704b;
    padding: 5rpx 10rpx;
    border-radius: 10rpx;
    font-size: 20rpx;
    flex-shrink: 0;
    }
}
</style>
