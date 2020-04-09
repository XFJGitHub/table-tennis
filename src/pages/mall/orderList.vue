<config>
  {
    'navigationBarTitleText': '订单列表'
  }
</config>
<template>
  <div>
    <div class="tabs_wrap">
      <div class="tabs" @click="activeTab = 0" :class="{ 'tabs_active' : activeTab === 0}">全部</div>
      <div class="tabs" @click="activeTab = 1" :class="{ 'tabs_active' : activeTab === 1}">待完成</div>
    </div>

    <div>
      <div class="order_wrap_shadow" v-for="(item, index) in dataList" :key="item.id+index">
        <div class="order_wrap">
          <div class="justify_between align_center order-status">
            <div class="order-time">订单编号:{{item.num}}</div>
            <div :style="{ color: item.orderStatus === '已完成' ? '#00e500' : '#c32136' }" class="justify_end">{{item.orderStatus}}</div>
          </div>
          <div class="justify_between my_20">
            <div class="order-name">{{item.goods}}</div>
            <div class="order-time">{{item.time}}</div>
          </div>
          <div class="justify_between align_center mt_40">
            <div class="order-price">￥{{item.price}}</div>
            <div v-if="item.orderStatus === '待付款'" class="pay-button">支付</div>
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
      activeTab: 0,
      dataList: [
        {
          num: 331022333,
          orderStatus: '已完成',
          goods: '金丝台球',
          time: '2020-04-11',
          price: 125
        },
        {
          num: 331023344,
          orderStatus: '待付款',
          goods: '金丝台球',
          time: '2020-04-11',
          price: 125
        }
      ]
    }
  }
}
</script>

<style lang='scss'>
.order_wrap_shadow {
  margin: 40rpx;
  // border: 2rpx solid #e9ecf0;
  border-left: 6rpx solid #e9ecf0;
  background: #fbfbfc;
  padding: 20rpx 20rpx 15rpx;
  box-shadow: inset 0 18rpx 15rpx -15rpx rgba(232, 232, 233, 0.3);
  .order_wrap {
    padding: 20rpx 30rpx;
    border-radius: 20rpx;
    background: #FFFF;
    // margin: 20rpx;
    box-shadow: 0 10rpx rgba(240, 242, 245, 0.4);
    .order-status {
      font-size: 28rpx;
      border-bottom: 1px solid #e5e5e5;
      padding-bottom: 20rpx;
    }
    .order-name {
      // font-weight: bold;
    }
    .order-time {
      font-size: 24rpx;
      color: #98999c;
    }
    .order-price {
      font-size: 30rpx;
      font-weight: bold;
    }
    .pay-button {
      font-size: 28rpx;
      color: white;
      background: #3399FF;
      padding: 10rpx 40rpx;
      border-radius: 20rpx;
    }
  }
}
</style>
