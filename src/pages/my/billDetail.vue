<template>
  <div class="bill-detail-wrap">
    <div class="detail-wrap">
      <div style="width: 80rpx;height:80rpx">
        <img class="detail-img" :src="dataList.url">
      </div>
      <div class="my_20">{{dataList.name}}</div>
      <div class="font_bold fontsize_40">{{dataList.price}}</div>
    </div>

    <template>
      <p>
        <span class="title-text">当前状态</span>
        <span>支付成功</span>
      </p>
      <p>
        <span class="title-text">账单类别</span>
        <span>{{billType}}</span>
      </p>
      <p>
        <span class="title-text">支付时间</span>
        <span>{{dataList.time}}</span>
      </p>
      <template v-if="dataList.name === '台费'">
        <p>
          <span class="title-text">开始时间</span>
          <span>{{dataList.startTime}}</span>
        </p>
        <p>
          <span class="title-text">结束时间</span>
          <span>{{dataList.endTime}}</span>
        </p>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataList: {}
    }
  },
  computed: {
    billType () {
      switch (this.dataList._type) {
        case 'goods': return '商品'
        case 'billiard': return '台费'
        case 'recharge': return '充值'
      }
    }
  },
  onLoad (options) {
    this.$db.collection('billList').where({
      _id: options.id
    }).get({
      success: res => {
        this.dataList = res.data[0]
        this.dataList.price = this.dataList.price.toFixed(2)
      }
    })
  }
}
</script>

<style lang='scss'>
.bill-detail-wrap {
  .detail-wrap {
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 40rpx;
    padding-bottom: 60rpx;
    margin-bottom: 60rpx;
    .detail-img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  p {
    margin: 0 40rpx;
  }
  .title-text {
    color: rgb(156, 155, 155);
    width: 200rpx;
    display: inline-block;
  }
}
</style>
