<config>
  {
    'navigationBarTitleText': '商品详情',
    "usingComponents": {}
  }
</config>
<template>
    <div class="goods-detail">
      <div class="flex_column align_center">
        <div>台球杆</div>
        <div class="img-wrap">
          <img style="width:100%;height:100%" :src="dataList.url">
        </div>
        <div class="goods-name">{{dataList.name}}</div>
        <div class="goods-price">￥{{dataList.price}}</div>

        <div class="cal_wrap">
          <div class="cal-button" @click="goodsNum--">-</div>
          <div class="cal-num">{{goodsNum}}</div>
          <div class="cal-button cal-button-jia" @click="goodsNum++">+</div>
        </div>
      </div>

      <div class="justify_center mt_30">
        <div class="t-button t-button-primary">加入购物车</div>
        <div class="t-button t-button-primary ml_30">立即购买</div>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      dataList: {
        url: 'http://img2.imgtn.bdimg.com/it/u=4288298065,3108720683&fm=26&gp=0.jpg',
        name: '金丝',
        price: 99
      },
      goodsNum: 0
    }
  },
  onLoad (options) {
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
  .goods-name {
    margin-top: 100rpx;
    font-size: 35rpx;
    // font-weight: bold;
  }
  .goods-price {
    margin-top: 100rpx;

  }
  .cal_wrap {
    margin-top: 20rpx;
    display: flex;
    align-content: center;
    border-radius: 10rpx;
    border: 2px solid #e8ebf1;
    .cal-num {
      display: flex;
      flex-shrink: 0;
      justify-content: center;
      align-items: center;
      width: 120rpx;
    }
    .cal-button {
      background: rgb(245, 247, 250);
      border-radius: 10rpx 0 0 10rpx;
      width: 80rpx;
      text-align: center;
      font-size: 50rpx;
      color: #888a8f;
      // border: 1px solid #e5e5e5;
    }
    .cal-button-jia {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 40rpx;
      color: #000000;
      border-radius: 0 10rpx 10rpx 0;
    }
  }
}
</style>
