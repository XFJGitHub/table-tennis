<config>
  {
    "navigationBarTitleText": '账单',
    'enablePullDownRefresh': true
  }
</config>
<template>
  <div class="bill-wrap">
    <template v-if="dataList.length > 0">
      <div
        @click="toBillDetails(item)"
        v-for="(item, ind) in dataList"
        :key="ind"
        class="flex p_20 pr_0">
        <div class="flex_shrink" style="width: 80rpx;height:80rpx">
          <img class="bill-img" :src="item.url" >
        </div>
        <div class="bill-text flex-grow">
          <div>
            <div style="width:450rpx" class="text-ellipsis">{{item.name}}</div>
            <div class="mt_20 fontsize_24 color_156">{{item.time}}</div>
          </div>
          <div :style="{color: item.isIncome ? '#CD853F' : ''}">{{item.isIncome === true ? '+' : '-'}}{{item.price}}</div>
        </div>
      </div>
    </template>
    <div class="align_center flex_column" v-else>
      <img style="margin-top: 200rpx;width: 280rpx;height:200rpx" src="https://static.dingdandao.com/612007ba2dc43b5c6646f19fe54a4206">
      <div style="color: #a3b1bf" class="mt_20 fontsize_26">暂无数据</div>
    </div>
    <div class="color_156 fontsize_26 justify_center py_20" v-if="isEmpty">
      -已经拉到底啦-
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataList: [],
      pageNo: 0,
      pageSize: 20,
      stopLoad: false,
      isEmpty: false
    }
  },
  onReachBottom () {
    if (!this.stopLoad) {
      wx.showLoading({
        title: '玩命加载中'
      })
      this.$db.collection('billList').count().then(res => {
        if (this.dataList.length < res.total) {
          this.pageNo++
          this.stopLoad = false
          this.getData().then(_ => {
            wx.hideLoading()
          })
        } else {
          this.isEmpty = true
          this.stopLoad = true
          wx.hideLoading()
        }
      })
    }
  },
  methods: {
    getData () {
      let promise1 = (res, rej) => {
        this.$db.collection('billList').aggregate().sort({
          time: -1
        }).match({
          _openid: Megalo.getStorageSync('openid')
        }).skip(this.pageNo * this.pageSize)
          .limit(this.pageSize)
          .end({
            success: res => {
              this.dataList = this.dataList.concat(res.list.map(e => {
                e.time = e.time.slice(0, 11)
                return e
              }))
            }
          })
        res()
      }
      return new Promise(promise1)
    },
    toBillDetails (row) {
      wx.navigateTo({
        url: `/pages/my/billDetail?id=${row._id}`
      })
    }
  },
  onPullDownRefresh () {
    this.pageNo = 0
    this.dataList = []
    this.getData()
    wx.stopPullDownRefresh()
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
