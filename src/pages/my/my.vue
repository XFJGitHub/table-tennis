<config>
  {
    'navigationBarTitleText': '个人中心',
    'navigationStyle': 'default'
  }
</config>
<template>
  <div class="my_wrap">
    <div class="my-head flex">
      <div style="width: 130rpx;height:130rpx">
        <!-- <img v-if="avatarUrl" style="width:100%;height:100%;border-radius: 30rpx;" :src="avatarUrl">
        <img v-else style="width:100%;height:100%;border-radius: 30rpx;" src="https://static.dingdandao.com//ueditor/upload/image/20190822/1566461822343050529.png"> -->
        <img style="width:100%;height:100%;border-radius: 30rpx;" :src="avatarUrl ? avatarUrl : 'https://static.dingdandao.com//ueditor/upload/image/20190822/1566461822343050529.png'">
      </div>
      <div class="ml_40">
        <div v-if="!nickName">
          <button hover-class="none" class="button-noclass" open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfo">点击显示微信头像</button>
          <div class="mt_30 fontsize_30 color_156">游客</div>
        </div>
        <div v-else>
          <div class="font_bold">{{nickName}}</div>
          <div class="mt_30 color_464">普通用户</div>
        </div>
      </div>
    </div>

    <div class="my-body">
      <div class="flex align_center">
        <i class="icon_money m_20" />
        <div class="icon-text-wrap">
          <div class="icon-text">余额</div>
          <div class="flex align_center">
            <div class="color_156">{{money}}.00元</div>
            <!-- <i class="icon_right ml_10" /> -->
          </div>
        </div>
      </div>
      <div class="flex align_center" @click="toOrderList">
        <i class="icon_order m_20" />
        <div class="icon-text-wrap">
          <div class="icon-text">订单列表</div>
          <i class="icon_right" />
        </div>
      </div>

      <div class="flex align_center" @click="toBilliards">
        <i class="icon_time m_20" />
        <div class="icon-text-wrap">
          <div class="icon-text">预约球桌</div>
          <i class="icon_right" />
        </div>
      </div>

      <div class="flex align_center" @click="toAdvice">
        <i class="icon_advice m_20" />
        <div class="icon-text-wrap" style="border:none">
          <div class="icon-text">投诉与建议</div>
          <i class="icon_right" />
        </div>
      </div>
    </div>

    <div class="my-body">
      <div class="flex align_center">
        <i class="icon_setting m_20" />
        <div class="icon-text-wrap" style="border:none">
          <div class="icon-text">设置</div>
          <i class="icon_right" />
        </div>
      </div>
    </div>
    <div>
      <div class="my-body">
        <div class="flex align_center">
          <i class="icon_reports m_20" />
          <div class="icon-text-wrap">
            <div class="icon-text">查看报表</div>
            <i class="icon_right" />
          </div>
        </div>
        <div class="flex align_center">
          <i class="icon_open m_20" />
          <div class="icon-text-wrap" style="border:none">
            <div class="icon-text">暂停营业</div>
              <switch :checked="stopBusinessStatus" color="red" @change="changeBussinessStatus" style="zoom: .8"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      avatarUrl: Megalo.getStorageSync('avatarUrl'),
      nickName: Megalo.getStorageSync('nickName'),
      money: 0,
      stopBusinessStatus: false
    }
  },
  onLoad () {
    wx.cloud.callFunction({
      name: 'demo',
      complete: res => {
        Megalo.setStorageSync('openid', res.result.openid)
      }
    })
  },
  methods: {
    // 获取用户信息
    getUserInfo (e) {
      this.nickName = e.detail.userInfo.nickName
      this.avatarUrl = e.detail.userInfo.avatarUrl
      Megalo.setStorageSync('nickName', e.detail.userInfo.nickName)
      Megalo.setStorageSync('avatarUrl', e.detail.userInfo.avatarUrl)
      this.$db.collection('userInfo').get({
        success: res => {
          res.data.map(e => {
            if (e._openid !== Megalo.getStorageSync('openid')) {
              this.$db.collection('userInfo').add({
                data: {
                  nickName: this.nickName,
                  avatarUrl: this.avatarUrl,
                  balance: 0,
                  isSeller: false
                }
              })
            }
          })
        }
      })
    },
    // 投诉与建议
    toAdvice () {
      wx.navigateTo({
        url: '/pages/my/advice'
      })
    },
    // 订单列表
    toOrderList () {
      wx.navigateTo({
        url: '/pages/mall/orderList'
      })
    },
    // 预约球桌
    toBilliards () {
      wx.switchTab({
        url: '/pages/billiards/billiards'
      })
    },
    // 暂停营业
    changeBussinessStatus () {}
  }
}
</script>

<style lang='scss'>
page {
  background: #F4F4F4;
}
.my-head {
  padding: 20rpx 0 60rpx 40rpx;
  background: #fff;
}
.my-body {
  margin-top: 15rpx;
  background: #fff;
  .icon-text-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx;
    padding-left: 0;
    width: calc(100% - 110rpx);
    border-bottom: 1px solid #e5e5e5;
  }
}
</style>
