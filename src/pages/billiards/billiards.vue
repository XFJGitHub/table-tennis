<config>
  {
    'navigationBarTitleText': '娱乐中心',
    'enablePullDownRefresh': true
  }
</config>
<template>
  <div class="h_100">
    <div class="head-tip">
      <div>*</div>
      <div>不足半小时的按半小时计算，超过半小时的按一小时计算，请合理安排时间</div>
    </div>
    <div v-if="!isClosed" class="tables-wrap">
      <!-- <scroll-view
        style="height:1000rpx"
        scroll-y
      > -->
      <div class="scroll-wrap">
        <div class="line_height1 mb_10 flex_column align_center" v-for="(item, index) in tableList" :key="index">
          <div @click="item.isUsing = !item.isUsing" style="width:600rpx;height:300rpx;">
            <img v-if="item.disable" style="width:100%;height:100%;" src="https://static.dingdandao.com/0ece7207a7eecd7361045572d97b08fb">
            <img v-else style="width:100%;height:100%;" :src="item.isUsing ? 'https://static.dingdandao.com/df9f037eb9fcc2ae4ac8d6486d8241da' : 'https://static.dingdandao.com/2fd09d05fca5e2bb72a8e6c838a1511a'">
          </div>
          <div style="width:100%" class="my_20 justify_between align_center">
            <div class="flex">
              <div class="table-title">{{item.name}}</div>
              <div class="table-title ml_20">￥{{item.price}}</div>
            </div>
            <div class="flex">
              <div @click="useTable(item)" v-if="!item.disable" class="ml_10 t-button t-button-primary">开台</div>
            </div>
          </div>
          <div v-if="item.startTime" style="width:100%" class="justify_between align_center">
            <div class="flex">
              <div class="table-title">开始时间：</div>
              <div class="table-title">{{item.startTime.slice(5)}}</div>
            </div>
            <div @click="settleAccount(item)" class="t-button t-button-primary">结账</div>
          </div>
          <!-- <div class="flex"> -->
            <!-- <button class="t-button mr_20" @click="toAppointment(item.id)">预约</button> -->
          <!-- </div> -->
        </div>
      </div>
      <!-- </scroll-view> -->
    </div>
    <div style="background:#fff" class="h_100 align_center flex_column" v-else>
      <img style="width:260rpx;height:260rpx;margin-top:100rpx" src="https://static.dingdandao.com/4d102a263b12b46b4b981dd80d9f6602">
      <div style="color: #a3b1bf" class="mt_20 fontsize_26">很抱歉，商家暂停了营业</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isClosed: false,
      tableList: [],
      isUsing: false,
      totalMoney: undefined
    }
  },
  onPullDownRefresh () {
    this.getData()
    wx.stopPullDownRefresh()
  },
  onShow () {
    this.getData()
    this.getStatus()
  },
  methods: {
    getData () {
      this.$db.collection('tables').get({
        success: res => {
          this.tableList = res.data
        }
      })
    },
    getStatus () {
      // 多商家可以加个字段来查询
      this.$db.collection('checkStatus').get({
        success: res => {
          this.isClosed = res.data[0].isClosed
        }
      })
    },
    useTable (row) {
      let usingStatus = false
      const date = new Date()
      const year = date.getFullYear()
      const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      if (!Megalo.getStorageSync('openid')) {
        wx.showToast({
          title: '您还没有登录，即将跳转到登录页面',
          icon: 'none',
          duration: 2500,
          success: _ => {
            setTimeout(_ => {
              wx.switchTab({
                url: '/pages/my/my'
              })
            }, 2000)
          }
        })
      } else {
        this.$db.collection('tables').where({
          _id: row._id
        }).get({
          success: res => {
            usingStatus = res.data[0].isUsing
            if (usingStatus) {
              wx.showToast({
                title: '该桌子正在使用中，请尝试其他桌子',
                icon: 'none'
              })
            } else {
              wx.showLoading({
                title: '开台中'
              })
              const startTime = `${year}-${month}-${day} ${hour}:${minutes}`
              console.log(startTime, 'st')
              wx.cloud.callFunction({
                name: 'useTable',
                data: {
                  id: row._id,
                  startTime: startTime,
                  useName: Megalo.getStorageSync('nickName')
                },
                success: _ => {
                  wx.hideLoading()
                  this.getData()
                }
              })
            }
          }
        })
      }
    },
    // toAppointment (id) {
    //   wx.navigateTo({
    //     url: `/pages/billiards/appointment?tableId=${id}`
    //   })
    // },
    // 生成账单
    setBills (startTime, endTime, month, day, hour, minutes, ss, balance) {
      if (this.totalMoney !== 0) {
        this.$db.collection('billList').add({
          data: {
            isIncome: false,
            name: '付款给EGE Clube',
            _type: 'billiard',
            price: this.totalMoney,
            time: `${month}月${day}日 ${hour}:${minutes}:${ss}`,
            startTime: startTime,
            endTime: endTime,
            url: 'https://static.dingdandao.com/0daecc4ad851a61763ada65c727212ff'
          }
        })
      }
    },
    // 生成使用情况
    setUsingInfo (row, tableHour, totalMoney) {
      this.$db.collection('tableUsing').add({
        data: {
          day: row.startTime.slice(5, 10),
          time: row.startTime.slice(11),
          timeStamp: new Date(row.startTime.slice(5, 10)).getTime(),
          name: row.name,
          brand: row.brand,
          nickName: row.useName,
          usingHours: tableHour,
          totalMoney: totalMoney
        }
      })
    },
    settleAccount (row) {
      if (!Megalo.getStorageSync('openid')) {
        wx.showToast({
          title: '您没有登录不能支付',
          icon: 'none',
          duration: 2500,
          success: _ => {
            setTimeout(_ => {
              wx.switchTab({
                url: '/pages/my/my'
              })
            }, 2000)
          }
        })
      } else {
        console.log(row)
        const date = new Date()
        const year = date.getFullYear()
        const month = (date.getMonth() + 1)
        const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
        const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
        const ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
        const endTime = `${year}-${month < 10 ? '0' + month : month}-${day} ${hour}:${minutes}`
        const iosEndTime = endTime.replace(/-/g, '/') // ios不识别hh-mm
        const iosStartTime = row.startTime.replace(/-/g, '/')
        const diffSeconds = (new Date(iosEndTime).getTime()) - (new Date(iosStartTime).getTime())
        const tableHour = Math.floor(diffSeconds / 1000 / 3600)
        const tableMinute = diffSeconds / 1000 / 60 % 60
        console.log(iosEndTime, 'en')
        console.log(iosStartTime, 'st')
        console.log(tableHour, 'h')
        console.log(tableMinute, 'm')
        if (tableMinute < 30 && tableMinute > 0) {
          this.totalMoney = (tableHour + 0.5) * row.price
        } else if (tableMinute === 0 && tableMinute === 0) {
          this.totalMoney = 0
        } else {
          this.totalMoney = (tableHour + 1) * row.price
        }
        wx.showModal({
          title: row.useName !== Megalo.getStorageSync('nickName') ? `您确定要为【${row.useName}】用户结账吗？` : '消费金额',
          content: `您消费时间共${tableHour}小时${tableMinute < 10 ? '0' + tableMinute : tableMinute}分，消费金额为${this.totalMoney}元`,
          success: res => {
            let nowBalance
            if (res.confirm) {
              this.$db.collection('userInfo').where({
                _openid: Megalo.getStorageSync('openid')
              }).get({
                success: res => {
                  nowBalance = res.data[0].balance
                  if (nowBalance >= this.totalMoney) {
                    wx.showToast({
                      title: '支付成功',
                      icon: 'none',
                      success: _ => {
                        wx.cloud.callFunction({
                          name: 'settleTable',
                          data: {
                            id: row._id
                          }
                        })
                        // this.$db.collection('tables').where({
                        //   _id: row._id
                        // }).update({
                        //   data: {
                        //     startTime: '',
                        //     isUsing: false
                        //   }
                        // })
                      }
                    })
                    this.$db.collection('userInfo').where({
                      _openid: Megalo.getStorageSync('openid')
                    }).update({
                      data: {
                        balance: nowBalance - this.totalMoney
                      }
                    })
                    this.setUsingInfo(row, tableHour, this.totalMoney)
                    this.setBills(row.startTime, endTime, month, day, hour, minutes, ss)
                    // setTimeout(_ => {
                    wx.reLaunch({ url: `/pages/billiards/billiardsDetail?startTime=${row.startTime}&endTime=${endTime}&totalMoney=${this.totalMoney}` })
                    // }, 1000)
                  } else {
                    wx.showToast({
                      title: '很抱歉您的余额不足，请前往充值',
                      icon: 'none',
                      success: _ => {
                        wx.navigateTo({
                          url: '/pages/my/recharge'
                        })
                      }
                    })
                  }
                }
              })
            } else if (res.cancel) {
              wx.showToast({
                title: '支付失败，请尽快支付',
                icon: 'none'
              })
            }
          }
        })
      }
    }
  }
}
</script>

<style lang='scss'>
page {
  height: 100%;
  background: #F4F4F4;
}
.head-tip {
  display: flex;
  background: #fff;
  font-size: 26rpx;
  color: cornflowerblue;
  padding: 20rpx;
}
.tables-wrap {
  border-radius: 30rpx;
  padding: 40rpx;
  margin: 20rpx;
  background: white;
  .scroll-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .table-title {
      color: #464c5b;
      font-size: 28rpx;
    }
  }
}
.close-button {
  text-align: center;
  width: 500px;
  padding: 16px 0;
  margin-bottom: 20px;
  color: white;
  background: #3399FF;
}
</style>
