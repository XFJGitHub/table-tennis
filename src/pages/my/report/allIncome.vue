<config>
  {
    'navigationBarTitleText': '报表中心'
  }
</config>
<template>
  <div>
    <div class="cardNew">
      <div class="cardNew-title">
        数据统计
      </div>
      <div class="cardNew-cotent">
        <div class="flex_column align_center">
          <div class="item-title fontsize_26">台球收入</div>
          <div class="item-num">￥{{billiardPrice}}</div>
        </div>
        <div class="flex_column align_center">
          <div class="item-title fontsize_26">商品收入</div>
          <div class="item-num">￥{{goodsPrice}}</div>
        </div>
        <div class="flex_column align_center">
          <div class="item-title fontsize_26">充值收入</div>
          <div class="item-num">￥{{rechargePrice}}</div>
        </div>
      </div>
    </div>
    <div class="cardNew-title">
      总收入
    </div>
    <div>
      <canvas canvas-id="pieCanvas" style="width:100%;height:300px"></canvas>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
var wxCharts = require('../../../utils/wxcharts');
var pieChart = null;
export default {
  data () {
    return {
      billiardPrice: 0,
      goodsPrice: 0,
      rechargePrice: 0
    }
  },
  onLoad: function (e) {
    var windowWidth = 320
    try {
      var res = wx.getSystemInfoSync()
        windowWidth = res.windowWidth
    } catch (e) {
      console.error('getSystemInfoSync failed!')
    }
    wx.cloud.callFunction({
      name: 'getIncome',
      success: res => {
        res.result.data.map(i => {
          if (i._type === 'billiard') {
            this.billiardPrice += Number(i.price)
          } else if (i._type === 'goods') {
            this.goodsPrice += i.price
          } else if (i._type === 'recharge') {
            this.rechargePrice += Number(i.price)
          }
        })
        // 饼图
        pieChart = new wxCharts({
          animation: true,
          canvasId: 'pieCanvas',
          type: 'pie',
          series: [
            {
            name: '台球收入',
            data: this.billiardPrice,
            }, 
            {
              name: '商品收入',
              data: this.goodsPrice
            },
            {
              name: '充值收入',
              data: this.rechargePrice,
              color: '#F15C80'
            }
          ],
          width: windowWidth,
          height: 300,
          dataLabel: true,
        })
      }
    })

  }
}
</script>

<style lang='scss'>
.cardNew {
  background: #fff;
  // box-shadow: 0 0 4px 0 rgba(0,0,0,.1);
  border-radius: 2px;
  margin-bottom: 20px;
  .cardNew-cotent {
    display: flex;
    justify-content: space-around;
    padding: 20rpx 0;
    .item-title {
      color: #999;
      margin-bottom: 20px;
    }
    .item-num {
      color: #333;
    }
  }
}
</style>
