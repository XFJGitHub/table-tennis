<config>
  {
    "navigationBarTitleText": '账单'
  }
</config>
<template>
  <div class="bill-wrap">
    <div
      v-for="(item, ind) in dataList"
      :key="ind"
      class="flex align_center p_20 pr_0"
    >
      <div style="width: 80rpx;height:80rpx">
        <img :src="item.url" class="bill-img">
      </div>
      <div class="bill-text flex-grow">
        <div>
          <div style="width:450rpx" class="text-ellipsis">{{item.name}}</div>
          <div class="mt_20 fontsize_24 color_156">{{item.time}}</div>
        </div>
        <div :style="{color: item.isIncome ? '#CD853F' : ''}">{{item.price}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataList: []
    }
  },
  methods: {
    getData () {
      this.$db.collection('billList').aggregate().sort({
        time: -1
      }).match({
        _openid: Megalo.getStorageSync('openid')
      }).end({
        success: res => {
          this.dataList = res.list.map(e => {
            e.time = e.time.slice(0, 11)
            return e
          })
        }
      })
    }
  },
  onLoad () {
    this.getData()
  }
}
</script>

<style lang='scss'>
.bill-wrap {
  .bill-img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
  .bill-text {
    margin-left: 30rpx;
    border-bottom: 1px solid #e5e5e5;
    padding: 0 20rpx 20rpx 0;
    display: flex;
    justify-content: space-between;
  }
}
</style>
