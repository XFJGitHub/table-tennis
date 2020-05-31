<config>
  {
    'navigationBarTitleText': '充值中心',
  }
</config>
<template>
  <div>
    <div class="p_40 flex border_bottom">
      充值金额：
      <input maxlength="7" type="number" v-model="rechargeNum" placeholder="请输入充值金额">
    </div>
    <div @click="recharge" class="m_20 t-button t-button-primary">充值</div>
    <div class="color_156 fontsize_26 p_20">温馨提示:只能充值小于一千万~</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rechargeNum: 100
    }
  },
  methods: {
    recharge () {
      const date = new Date()
      const month = date.getMonth() + 1
      const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      let nowBalance
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
        if (this.rechargeNum <= 0) {
          wx.showToast({
            title: '充值金额不能为负数',
            icon: 'none'
          })
        } else {
          this.$db.collection('userInfo').where({
            _openid: Megalo.getStorageSync('openid')
          }).get({
            success: res => {
              nowBalance = res.data[0].balance
              this.$db.collection('userInfo').where({
                _openid: Megalo.getStorageSync('openid')
              }).update({
                data: {
                  balance: nowBalance + Number(this.rechargeNum)
                },
                success: _ => {
                  this.$db.collection('billList').add({
                    data: {
                      name: `充值余额`,
                      isIncome: true,
                      _type: 'recharge',
                      price: this.rechargeNum,
                      url: 'https://static.dingdandao.com/da4beb15dab1194cc20efefb6ba0d2fe',
                      time: `${month}月${day}日 ${hour}:${minutes}`
                    }
                  })
                  wx.showToast({
                    title: '充值成功',
                    duration: 3000,
                    success: _ => {
                      setTimeout(_ => {
                        wx.switchTab({
                          url: '/pages/my/my'
                        })
                      }, 2000)
                    }
                  })
                }
              })
            }
          })
        }
      }
    }
  }
}
</script>

<style lang='scss'>
</style>
