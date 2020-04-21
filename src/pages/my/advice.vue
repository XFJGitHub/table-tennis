<config>
  {
    'navigationBarTitleText': '投诉与建议',
  }
</config>
<template>
  <div>
    <div class="border_bottom p_20" style="width: 100%">
      <span class="red_star">*</span>
      投诉标题
      <input v-model="adviceTitle" style="margin-left: 23rpx;" type="text" placeholder="请输入投诉标题"/>
    </div>

    <div class="p_20">
      <span class="red_star">*</span>
      投诉内容
      <div class="relative"  style="height:350rpx;margin-left: 23rpx; border:1px solid #e5e5e5">
        <textarea style="width:100%" v-model="adviceContent" maxlength="300" placeholder="请输入您要投诉的内容" />
        <div class="content-length">{{adviceContent.length}}/300</div>
      </div>
    </div>

    <div class="p_20">
      上传图片<span class="fontsize_22 color_156">（最多上传5张）</span>
      <div class="flex flex_wrap mt_20" @click="chooseImg">
        <template v-if="imgList.length > 0">
          <img
            class="mr_20"
            style="width:200rpx;height:200rpx"
            :src="item.path"
            v-for="(item, index) in imgList" :key="index"
          >
        </template>
        <img
          v-else
          src='https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1856556629,785703109&fm=26&gp=0.jpg'
          style="width:200rpx;height:200rpx"
        >
      </div>
    </div>

    <div class="p_20">
      <span class="red_star">*</span>
      联系方式
      <input v-model="linkPhone" style="margin-left: 23rpx;" type="text" placeholder="请输入您的联系方式"/>
    </div>

    <div @click="submit" class="t-button t-button-primary mt_40 ml_20" style="width: 100rpx;text-align:center">提交</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      adviceTitle: '',
      adviceContent: '',
      linkPhone: '',
      imgList: []
    }
  },
  methods: {
    chooseImg () {
      let that = this
      wx.chooseImage({
        count: 5,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success (res) {
          that.imgList = res.tempFiles
        }
      })
    },
    submit () {
      this.$db.collection('adviceList').add({
        data: {
          adviceTitle: this.adviceTitle,
          adviceContent: this.adviceContent,
          linkPhone: this.linkPhone,
          imgList: this.imgList
        },
        success: _ => {
          wx.showToast({
            title: '提交成功',
            success: _ => {
              this.adviceTitle = ''
              this.adviceContent = ''
              this.linkPhone = ''
              this.imgList = []
            }
          })
        }
      })
    }
  }
}
</script>

<style lang='scss'>
.content-length {
  position: absolute;
  right: 20rpx;
  bottom: 10rpx;
}
</style>
