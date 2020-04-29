/* eslint-disable */
<config>
  {
    "navigationBarTitleText": ''
  }
</config>
<template>
<div class="bill-wrap flex_column align_center">
  <i class="icon_wechatPay"></i>
  <div class="title-text">支付成功</div>
  <div class="bill-money"><span class="fontsize_40">￥</span>{{totalMoney}}</div>
  <div class="color_464 fontsize_28">收款方：</div>
    <img class="mt_20" style="border-radius:10rpx;width:160rpx;height:112rpx;border:1px solid #e5e5e5" src="https://static.dingdandao.com/0daecc4ad851a61763ada65c727212ff">
  <div class="mt_20 mb_20">EGE clube</div>
  <div class="mt_20">开始时间：{{startTime}}</div>
  <div>结束时间：{{endTime}}</div>
  <div @click="submit" class="suc-btn">完成</div>
</div>
</template>

<script>
export default {
  data () {
    return {
      startTime: '',
      endTime: '',
      totalMoney: ''
    }
  },
  onLoad (options) {
    this.startTime = options.startTime.slice(5)
    this.endTime = options.endTime.slice(5)
    this.totalMoney = Number(options.totalMoney).toFixed(2)
  },
  methods: {
    submit () {
      wx.switchTab({
        url: '/pages/billiards/billiards'
      })
    }
  }
}
</script>

<style lang='scss'>
.bill-wrap {
  .title-text {
    margin-top: 20rpx;
    color: #5cc188;
    font-size: 28rpx;
  }
  .bill-money {
    margin: 100rpx 0;
    margin-bottom: 120rpx;
    font-size: 60rpx;
    font-weight: bold;
  }
  .suc-btn {
    position: fixed;
    bottom: 80rpx;
    background: #f2f2f2;
    padding: 20rpx;
    color: #5cc118;
    width: 400rpx;
    text-align: center;
    border-radius: 5rpx;
  }
}
</style>
