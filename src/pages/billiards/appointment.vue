<config>
  {
    'navigationBarTitleText': '预约球桌'
  }
</config>
<template>
    <div>
      <div class="color_464 fontsize_24">请在下方选择您方便的时间，届时请准时到达，谢谢合作</div>
      <div class="color_464 fontsize_24">本店营业时间为9am-10pm</div>
      <div class="color_464 fontsize_24">请注意只能预约今明两天</div>
      
      <picker
        class="mt_20 ml_40 border_bottom"
        mode="date"
        :value="appointDate"
        :start="startTime"
        :end="endTime"
        @change="changeDate"
      >
        <div class="fontsize_30">点我选择日期</div>
        <div>预约日期:{{appointDate}}</div>
      </picker>
      <picker
        class="mt_20 ml_40 border_bottom"
        mode="time"
        :value="appointTime"
        start="09:00"
        end="22:00"
        @change="changeTime"
      >
        <div class="fontsize_30">点我选择时间</div>
        <div class="picker">预约时间:{{appointTime}}</div>
      </picker>
      <div style="width:200rpx;text-align:center;margin-left:200rpx" class="mt_40 t-button t-button-primary">确定预约</div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      appointDate: '',
      appointTime: '',
      startTime: '',
      endTime: ''
    }
  },
  methods: {
    changeDate (e) {
      this.appointDate = e.detail.value.slice(5)
    },
    changeTime (e) {
      this.appointTime = e.detail.value
    }
  },
  onLoad () {
    const date = new Date()
    const month = date.getMonth() + 1
    const day = date.getDate()
    this.appointDate = `${month < 10 ? '0' + month : month}-${day}`
    this.startTime = `${month < 10 ? '0' + month : month}-${day}`
    this.endTime = `${month < 10 ? '0' + month : month}-${day + 1}`
  }
}
</script>

<style lang='scss'>
page {
  padding: 20rpx;
  // background: #F4F4F4;
}
</style>
