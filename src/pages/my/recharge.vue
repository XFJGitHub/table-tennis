<config>
  {
    'navigationBarTitleText': '充值中心',
  }
</config>
<template>
  <div>
    <div class="p_40 flex border_bottom">
      充值金额：
      <input type="number" v-model="rechargeNum" placeholder="请输入充值金额">
    </div>
    <div @click="recharge" class="m_20 t-button t-button-primary">充值</div>
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
      this.$db.collection('userInfo').where({
        _openid: Megalo.getStorageSync('openid')
      }).update({
        data: {
          balance: Number(Megalo.getStorageSync('balance')) + this.rechargeNum
        },
        success: _ => {
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
  }
}
</script>

<style lang='scss'>
</style>
