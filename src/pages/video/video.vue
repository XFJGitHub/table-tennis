<config>
  {
    'navigationBarTitleText': '社区中心'
  }
</config>
<template>
  <div>
    <div class="tabs_wrap">
      <div class="tabs" @click="activeTab = 0" :class="{ 'tabs_active' : activeTab === 0}">视频</div>
      <div class="tabs" @click="activeTab = 1" :class="{ 'tabs_active' : activeTab === 1}">文章</div>
    </div>

    <div v-if="activeTab === 0">
      <div class="video-body_wrap mb_20" v-for="(item, index) in videoList" :key="index">
        <video :src="item.voUrl"></video>
      </div>
    </div>

    <div class="p_20" v-else>
      <div
        class="article-body_wrap mb_20"
        v-for="(art, ind) in articleList"
        :key="ind"
        @click="toArticleDetail(art)"
      >
        <div style="width:260rpx" class="mr_10">
          <div class="text-ellipsis">{{art.title}}</div>
          <div class="color_464 fontsize_24 mt_40">{{art.remark}}</div>
        </div>
        <div style="width: 360rpx;height:240rpx;">
          <img style="width:100%;height:100%;" :src="art.url">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeTab: 1,
      videoList: [
        {
          voUrl: 'https://haokan.baidu.com/v?vid=18174058492876354455&pd=bjh&fr=bjhauthor&type=video'
        }
      ],
      articleList: [
        {
          title: '我问二我绕弯儿威尔而问绕弯儿绕弯儿热污染二而我任务热污染二王二二二王二',
          remark: '123',
          url: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3386247472,87720242&fm=26&gp=0.jpg'
        },
        {
          title: '123',
          remark: '123',
          url: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3386247472,87720242&fm=26&gp=0.jpg'
        }
      ]
    }
  },
  methods: {
    toArticleDetail (row) {
      wx.navigateTo({
        url: `/pages/video/articleDetail?articleId=${row.id}`
      })
    }
  }
}
</script>

<style lang='scss'>
page {
  background: #F4F4F4;
}

.video-body_wrap {
  background: white;
  border: 1px solid #e5e5e5;
  padding: 20rpx;
}
.article-body_wrap {
  display: flex;
  justify-content: space-between;
  background: white;
  border-radius: 20rpx;
  padding: 40rpx;
  border: 1px solid #e5e5e5;
}
</style>
