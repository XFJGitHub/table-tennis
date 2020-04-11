<config>
  {
    "usingComponents": {}
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
          <div class="icon-tips">视频中心</div>
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

      <div class="flex align_center">
        <i class="notice" />
        <div class="notice-tips">{{notice}}</div>
      </div>

      <div class="font_bold">发现好物</div>
      <div
        class="flex goods-style"
        v-for="(goods, index) in goodsList" :key="index"
        @click="toGoodsDetails(goods)"
      >
        <img :src="goods.url" class="goods-img">
        <div class="ml_40 flex-grow">
          <div class="flex_column justify_between h_100">
            <div>
              <div class="goods-title">{{goods.title}}</div>
              <div class="goods-remark">{{goods.remark}}</div>
            </div>
            <div class="goods-price">￥{{goods.price}}</div>
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
      swiperImgs: [
        {
          id: 0,
          url: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3047715767,2472265054&fm=26&gp=0.jpg'
        },
        {
          id: 1,
          url: 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1097065796,543323425&fm=26&gp=0.jpg'
        },
        {
          id: 2,
          url: 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2292788998,2636499574&fm=26&gp=0.jpg'
        }
      ],
      notice: '今日的活动十分劲爆',
      goodsList: [
        {
          id: 0,
          url: 'data:image/jpeg;base64,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',
          title: 'xxxx台球杆',
          remark: '金丝木进口',
          price: 338
        },
        {
          id: 1,
          url: 'http://img2.imgtn.bdimg.com/it/u=4288298065,3108720683&fm=26&gp=0.jpg',
          title: '嘟嘟嘟的死你台球杆',
          remark: '正品包邮哦',
          price: 128
        }
      ]
    }
  },
  methods: {
    toTabbar (num) {
      const url = {
        0: '/pages/billiards/billiards',
        1: '/pages/video/video',
        2: '/pages/mall/mall',
        3: '/pages/my/advice'
      }
      if (num === 3) {
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
        url: `/pages/mall/goodsDetail?goodsId=${val.id}`
      })
    }
  }
}
</script>

<style lang='scss'>
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
}
.goods-style {
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
  .goods-remark {
    line-height: 30rpx;
    font-size: 30rpx;
  }
  .goods-price {
    line-height: 35rpx;
    font-size: 35rpx;
    color: #FF4E00;
    font-weight: bold;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
