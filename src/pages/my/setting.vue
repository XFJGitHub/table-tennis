<config>
  {
    'navigationBarTitleText': '设置中心',
  }
</config>
<template>
  <div class="setting-wrap">
    <div v-if="isLogin">
      <div class="setting-box">
        <div>头像</div>
        <div style="width:80rpx;height:80rpx">
          <img :src="avatarUrl"  class="w_100 h_100 border_radius">
        </div>
      </div>
      <div class="setting-box">
        <div>微信名</div>
        <div>{{nickName}}</div>
      </div>
      <div class="setting-box">
        <div>身份</div>
        <div>{{isSeller ? '商家' : '用户'}}</div>
      </div>
      <div class="setting-bottom" @click="logout">
        退出登录
      </div>
    </div>
    <div class="align_center flex_column" v-else>
      <img style="margin-top: 200rpx;width: 140rpx;height:100rpx" src="https://static.dingdandao.com/468f5876ad11b001fa6e7b2bdfa181d5">
      <div style="color: #a3b1bf;margin-left: -20px" class="mt_20 fontsize_26">您还未登录</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      avatarUrl: '',
      nickName: '',
      isSeller: '',
      isLogin: Megalo.getStorageSync('openid')
    }
  },
  methods: {
    logout () {
      Megalo.clearStorageSync()
      wx.showToast({
        title: '退出成功',
        success: _ => {
          wx.switchTab({
            url: '/pages/my/my'
          })
        }
      })
    }
  },
  onShow () {
    if (this.isLogin) {
      this.$db.collection('userInfo').where({
        _openid: Megalo.getStorageSync('openid')
      }).get({
        success: res => {
          this.avatarUrl = res.data[0].avatarUrl
          this.nickName = res.data[0].nickName
          this.isSeller = res.data[0].isSeller
        }
      })
    }
  }
}
</script>

<style lang='scss'>
.setting-wrap {
  .setting-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e5e5e5;
    padding: 20rpx;
    color: rgb(172, 172, 175);
  }
  .setting-bottom {
    background: linear-gradient(to right, #ff9442,  #ff504d);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0px;
    color: #fff;
    height:100rpx;
  }
}
</style>
