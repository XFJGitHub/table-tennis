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
      :value="startDayIndex"
      :range="dayList"
      @change="changeStaratDay">
        <div class="picker">
          开始时间: {{startDate}}
        </div>
      </picker>
      <div class="mx_20">至</div>
      <picker
      mode="multiSelector"
      :value="endDayIndex"
      :range="dayList"
      @change="changeEndDay">
        <div class="picker">
          结束时间：{{endDate}}
        </div>
      </picker>
    </div>
    <div class="fontsize_26 color_156 justify_end mb_20 pr_10">点击筛选时间，默认选择一周的时间</div>
    <div class="cardNew-title">
      球桌每日收入
    </div>
    <div class="mt_40">
      <canvas canvas-id="lineCanvas1" disable-scroll="false" style="width:100%;height:200px"></canvas>
    </div>
    <div class="cardNew-title">
      球桌每日使用次数
    </div>
    <div class="mt_40">
      <canvas canvas-id="lineCanvas2" disable-scroll="false" style="width:100%;height:200px"></canvas>
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
      startDayIndex:[0, 0],
      endDayIndex:[0, 0],
      dateArray: [],
      startDate: '',
      endDate: '',
    }
  },
  onShow () {
      const date = new Date()
      const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      this.startDayIndex = [month - 1, day - 6]
      this.startDate =  month + '-' + (day - 6)
      this.start7end()
      this.computerXdate()
      this.getData()
  },
  methods: {
    getData () {
      // const $ = this.$db.command.aggregate
      // const _ = this.$db.command
      // this.$db.collection('tableUsing').aggregate().match({
      //   timeStamp: _.gte(new Date(this.startDate).getTime()).and(_.lte(new Date(this.endDate).getTime()))
      // }).group({
      //   _id: {
      //     'date': '$day',
      //     'brand': '$brand'
      //   },
      //   totalPrice: $.sum('$totalMoney'),
      //   totalCount: $.sum(1)
      // }).end().then(res => {
      wx.cloud.callFunction({
        name: 'getEveryDay',
        data: {
          startDate: this.startDate,
          endDate: this.endDate
        },
        success: res => {
          console.log(res.result)
          //组合charts可以渲染的数组
          const newArray = []
          let brandList = []
          res.result.list.map(e => {
            const brand = e._id.brand
            if (!~brandList.indexOf(brand)) {
                brandList.push(brand)
            }
          })
          brandList.map(brand => {
            const price = []
            const count = []
            this.dateArray.map(_ => {
              price.push(0)
              count.push(0)
            })
            res.result.list.map(e => {
              const index = this.dateArray.indexOf(e._id.date)
              if (e._id.brand === brand) {
                  price[index] = e.totalPrice
                  count[index] = e.totalCount
              }
            })
            newArray.push({
              name: brand,
              price: price,
              count: count
            })
          })
          // console.log(newArray)

          // 动态生成series
          let seriesPriceData = []
          let seriesCountData = []
          for(let i = 0;i < newArray.length; i++) {
            seriesPriceData.push({
              name: newArray[i].name,
              data: newArray[i].price
            })
            seriesCountData.push({
              name: newArray[i].name,
              data: newArray[i].count
            })
          }
          var lineChart1 = null;
          var lineChart2 = null;
          var windowWidth = 320
          try {
            var res = wx.getSystemInfoSync()
              windowWidth = res.windowWidth
          } catch (e) {
            console.error('getSystemInfoSync failed!')
          }
          // 每日收入
          lineChart1 = new wxCharts({
            canvasId: 'lineCanvas1',
            type: 'line',
            categories: this.dateArray,
            animation: true,
            series: seriesPriceData,
            xAxis: {
                disableGrid: true
            },
            yAxis: {
              format: function (val) {
                  return '￥' + val.toFixed(2);
              }
            },
            width: windowWidth,
            height: 200,
            // dataLabel: false,
            extra: {
              lineStyle: 'curve'
            }
          });
          // 使用次数
          lineChart2 = new wxCharts({
            canvasId: 'lineCanvas2',
            type: 'line',
            categories: this.dateArray,
            animation: true,
            series: seriesCountData,
            xAxis: {
                disableGrid: true
            },
            yAxis: {
              format: function (val) {
                return val + '次';
              },
              min: 0
            },
            width: windowWidth,
            height: 200,
            extra: {
              lineStyle: 'curve'
            }
          });
        },
        fail: err => {
          console.log(err)
        }
      })
    },
    // 计算x轴的时间
    computerXdate () {
      let timeDiff = (new Date(this.endDate).getTime() - new Date(this.startDate).getTime()) / 24 / 3600000
      for (var i = 0;i <= timeDiff; i++) {
        let tempMs = new Date(new Date(this.startDate).getTime() + i * 24 * 3600000).getTime()
        let tempMonth = new Date(tempMs).getMonth() + 1
        let tempDay = new Date(tempMs).getDate()
        this.dateArray[i] = (tempMonth < 10 ? '0' + tempMonth : tempMonth) + '-' + (tempDay < 10 ? '0' + tempDay : tempDay) 
      }
    },
    start7end () {
      // 设置开始结束时间相差一周
      const startMs = new Date(this.startDate).getTime()
      const endMonth = new Date(startMs + 24 * 3600000 * 6).getMonth() + 1
      const endDay = new Date(startMs + 24 * 3600000 * 6).getDate()
      this.endDayIndex = [endMonth - 1, endDay -1]
      this.endDate = (endMonth < 10 ? '0' + endMonth : endMonth) + '-' + (endDay < 10 ? '0' + endDay : endDay)
    },
    end7start () {
      const endMs = new Date(this.endDate).getTime()
      const startMonth = new Date(endMs - 24 * 3600000 * 7).getMonth() + 1
      const startDay = new Date(endMs - 24 * 3600000 * 7).getDate()
      this.startIndex = [startMonth - 1, startDay -1]
      this.startDate = (startMonth < 10 ? '0' + startMonth : startMonth) + '-' + (startDay < 10 ? '0' + startDay : startDay)
    },
    changeStaratDay (e) {
      const month = e.detail.value[0] + 1
      const day = e.detail.value[1] + 1
      this.startDate = (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day) 
      this.start7end()
      this.computerXdate()
      this.getData()
    },
    changeEndDay (e) {
      const month = e.detail.value[0] + 1
      const day = e.detail.value[1] + 1
      this.endDate = (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day) 
      this.end7start()
      this.computerXdate()
      // if (new Date(this.endDate).getTime() < new Date(this.startDate).getTime()) {
      //   wx.showToast({
      //     title: '结束时间不能早于开始时间',
      //     icon: 'none'
      //   })
      // } else
      this.getData()
    }
  }
}
</script>

<style lang='scss'>
</style>
