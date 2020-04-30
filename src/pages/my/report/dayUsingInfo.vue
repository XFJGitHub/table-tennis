<config>
  {
    'navigationBarTitleText': '报表中心'
  }
</config>
<template>
  <div>
    <div class="p_20 flex">
      <picker
      mode="multiSelector"
      :value="dayIndex"
      :range="dayList"
      @change="changeStaratDay">
        <div class="picker">
          选择日期: {{startDate}}
        </div>
      </picker>
    </div>
    <div class="fontsize_26 color_156 justify_end mb_20">点击筛选某日查看使用情况</div>
    <div class="cardNew-title">
      球桌四时使用次数
    </div>
    <div class="mt_20">
      <canvas canvas-id="columnCanvas" disable-scroll="true" style="width:100%;height:300px"></canvas>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
var wxCharts = require('../../../utils/wxcharts');
export default {
  data () {
    return {
      dayList: [
        ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24','25', '26', '27', '28', '29', '30', '31']
      ],
      dayIndex:[0, 0],
      startDate: '',
      allDayData: [0, 0, 0, 0]  // 凌晨 早上 中午 晚上
    }
  },
  onShow() {
    const date = new Date()
    const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    this.dayIndex = [month - 1, day - 1]
    this.startDate =  month + '-' + day
    this.getData()
  },
  methods: {
    getData () {
      // 获取屏幕宽度
      var windowWidth = 320
      try {
        var res = wx.getSystemInfoSync()
          windowWidth = res.windowWidth
      } catch (e) {
        console.error('getSystemInfoSync failed!')
      }
      wx.cloud.callFunction({
        name: 'tableUseInfo',
        data: {
          startDate: this.startDate
        },
        success: res => {
          this.allDayData = [0, 0, 0, 0]
          res.result.data.map(e => {
            if (e.time.slice(0, 2) > 0 && e.time.slice(0, 2) <= 5) {  // 凌晨
              this.allDayData[0]++
            } else if (e.time.slice(0, 2) > 5  && e.time.slice(0, 2) <= 12) { // 早
              this.allDayData[1]++
            } else if (e.time.slice(0, 2) > 12  && e.time.slice(0, 2) <= 19) {  //中
              this.allDayData[2]++
            } else {  // 晚
              this.allDayData[3]++
            }
          })
          new wxCharts({
            canvasId: 'columnCanvas',
            type: 'column',
            animation: true,
            categories: ['凌晨', '早上', '中午', '晚上'],
            series: [
              {
                name: '球桌使用次数',
                data: this.allDayData
              }
            ],
            yAxis: {
                format: function (val) {
                    return val + '次';
                }
            },
            xAxis: {
                disableGrid: true,
                type: 'calibration'
            },
            width: windowWidth,
            height: 300
          });
        },
        fail: err => {
          console.log(err)
        }
      })
      // this.$db.collection('tableUsing').where({
      //   day: this.startDate
      // }).get({
      // })
    },
    changeStaratDay (e) {
      const month = e.detail.value[0] + 1
      const day = e.detail.value[1] + 1
      this.startDate = (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day) 
      this.getData()
    }
  }
}
</script>

<style lang='scss'>
</style>
