<template>
  <div style="line-height:50px">
    <swiper
      class="index-swiper-wrap"
      :indicator-dots="true"
      :autoplay="true"
      :circular="true"
    >
      <swiper-item v-for="(item, index) in swiperImgs" :key="item.id + index">
        <img style="width:100%;height:400rpx" :src="item.url">
      </swiper-item>
    </swiper>
    <div class="index-body-wrap">
      <div class="justify_between">
        <div class="index-icon-wrap">
          <i class="entertainment-center"/>
          <div class="icon-tips">娱乐中心</div>
        </div>
        <div class="index-icon-wrap">
          <i class="vedio-center"/>
          <div class="icon-tips">视频中心</div>
        </div>
        <div class="index-icon-wrap">
          <i class="shopping-center"/>
          <div class="icon-tips">商城中心</div>
        </div>
        <div class="index-icon-wrap">
          <i class="advise-center"/>
          <div class="icon-tips">投诉中心</div>
        </div>
      </div>

      <div class="flex align_center">
        <i class="notice" />
        <div class="notice-tips">{{notice}}</div>
      </div>

      <div>发现好物</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      swiperImgs: [
        {
          id: 0,
          url: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3047715767,2472265054&fm=26&gp=0.jpg'
        },
        {
          id: 1,
          url: 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1097065796,543323425&fm=26&gp=0.jpg'
        },
        {
          id: 2,
          url: 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2292788998,2636499574&fm=26&gp=0.jpg'
        }
      ],
      notice: '今日的活动十分劲爆'
    }
  }
}
</script>

<style lang='scss'>
.index-swiper-wrap {
  height: 400rpx;
  width: 100%;
}
.index-body-wrap {
  position: relative;
  top: -60rpx;
  border-radius: 40rpx 40rpx 0 0;
  background: white;
  height: 100vw;
  padding: 40rpx;
  .index-btn-circle {
      border-radius: 50%;
      background: lightgreen;
      width: 50px;
      height: 50px;
  }
}
.notice-tips {
  padding-left: 20rpx;
  font-size: 20rpx;
  color: #000;
}
</style>
