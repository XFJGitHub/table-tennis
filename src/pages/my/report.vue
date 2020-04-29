<template>
  <div class="report-center-wrap">
    <div class="justify_center fontsize_40 font_bold borde_bottom pb_20">报表中心</div>
    <div class="report-box" @click="goTo(0)">
      总收入
      <div class="color_156 fontsize_28 mt_20">
        俱乐部开创至今的收入
      </div>
    </div>
    <div class="report-box" @click="goTo(1)">
      每日收入
      <div class="color_156 fontsize_28 mt_20">
        每个球桌品牌的每日收入和使用次数
      </div>
    </div>
    <div class="report-box" @click="goTo(2)">
      使用情况
      <div class="color_156 fontsize_28 mt_20">
        球桌凌晨、早上、中午、晚上的使用次数
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    goTo (num) {
      let url = [
        '/pages/my/report/allIncome',
        '/pages/my/report/everyDayIncome',
        '/pages/my/report/dayUsingInfo'
      ]
      wx.navigateTo({
        url: url[num]
      })
    }
  }
}
</script>

<style lang='scss'>
.report-center-wrap {
  .report-box {
    border: 1px solid #e5e5e5;
    padding: 20rpx;
    margin-top: 20rpx;
    text-align: center;
  }
}
</style>
