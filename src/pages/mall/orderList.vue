<config>
  {
    'navigationBarTitleText': '订单列表',
    'enablePullDownRefresh': true
  }
</config>
<template>
  <div>
    <div class="tabs_wrap">
      <div class="tabs" @click="changeTab(0)" :class="{ 'tabs_active' : activeTab === 0}">全部</div>
      <div class="tabs" @click="changeTab(1)" :class="{ 'tabs_active' : activeTab === 1}">待完成</div>
    </div>

    <div v-if="dataList.length > 0">
      <div
        @click="toOderDetail(item._id)"
        class="order_wrap_shadow"
        v-for="(item, index) in dataList"
        :key="index"
      >
        <div class="order_wrap">
          <div class="justify_between align_center order-status">
            <div class="order-time">订单编号:{{item.orderId}}</div>
            <div :style="{ color: item.orderStatus === '已完成' ? '#00e500' : '#c32136' }" class="justify_end">{{item.orderStatus}}</div>
          </div>
          <div class="justify_between align_center my_20">
            <div class="order-name text-ellipsis" style="width:360rpx">{{item.name}}</div>
            <div class="order-time">{{item.time.slice(0,10)}}</div>
          </div>
          <div class="justify_between align_center mt_40">
            <div class="order-price">￥{{item.price}}</div>
            <div @click="toOderDetail(item._id)" v-if="item.orderStatus === '待付款'" class="pay-button">支付</div>
          </div>
        </div>
      </div>
    </div>
    <div class="align_center flex_column" v-else>
      <img style="margin-top: 200rpx;width: 280rpx;height:200rpx" src="https://static.dingdandao.com/612007ba2dc43b5c6646f19fe54a4206">
      <div style="color: #a3b1bf" class="mt_20 fontsize_26">暂无数据</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeTab: 0,
      dataList: []
    }
  },
  methods: {
    getData () {
      const params = this.activeTab === 0 ? {
        _openid: Megalo.getStorageSync('openid')
      } : {
        _openid: Megalo.getStorageSync('openid'),
        orderType: 1
      }
      this.$db.collection('orderList').aggregate().sort({
        time: -1
      }).match({
        ...params
      }).end({
        success: res => {
          this.dataList = res.list
        }
      })
    },
    changeTab (type) {
      this.activeTab = type
      this.getData()
    },
    toOderDetail (id) {
      wx.navigateTo({
        url: `/pages/mall/orderDetail?_id=${id}`
      })
    }
  },
  onPullDownRefresh () {
    this.getData()
    wx.stopPullDownRefresh()
  },
  onShow () {
    this.getData()
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
