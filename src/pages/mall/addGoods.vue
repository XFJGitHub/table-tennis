<config>
  {
    'navigationBarTitleText': '添加商品',
  }
</config>
<template>
  <div>
    <div class="border_bottom p_20" style="width: 100%">
      <span class="red_star">*</span>
      商品名称
      <input v-model="goodsTitle" style="margin:10rpx 24rpx 0 24rpx" type="text" placeholder="请输入商品名称"/>
    </div>
    <div class="border_bottom p_20" style="width: 100%">
      <span class="red_star">*</span>
      商品价格
      <input v-model="goodsPrice" style="margin:10rpx 24rpx 0 24rpx" type="number" placeholder="请输入商品价格"/>
    </div>
    <div class="border_bottom p_20" style="width: 100%">
      <div>
        <span class="red_star">*</span>
        包邮
      </div>
      <RadioGroup @click="radioChange">
        <radio
        style="zoom:.8;margin:10rpx 20rpx 0 23rpx"
        v-for="item in radioList"
        :key="item.id"
        :value="item.tags"
        :checked="item.checked">
          {{item.tags}}
        </radio>
      </RadioGroup>
    </div>
    <div class="border_bottom p_20" style="width: 100%">
      <!-- 商品类别 -->
      <div>
        <div class="justify_between">
          <picker @change="typeChange" mode="selector" :range="routerList" :value="routerIndex">
            <span class="red_star">*</span>
            商品类别：{{routerList[routerIndex]}}
          </picker>
          <span class="fontsize_26 mr_40" @click="addNewType = true">新增类别</span>
        </div>
        <div class="justify_between align_center" v-if="addNewType">
          <input type="text" v-model="newRouter" style="margin:10rpx 0 0 23rpx" placeholder="请输入新增类别"/>
          <div class="flex mr_40">
            <i class="icon_submit" style="width:40rpx;height:40rpx" @click="addType()"/>
            <i class="icon_cancel ml_20" @click="addNewType = false"/>
          </div>
        </div>
      </div>
    </div>

    <div class="p_20">
      <span class="red_star">*</span>
      上传商品图片<span class="fontsize_22 color_156">（最多上传5张）</span>
      <div class="flex flex_wrap mt_20" @click="chooseImg">
        <template v-if="imgList.length > 0">
          <img
            class="mr_20"
            style="width:200rpx;height:200rpx"
            :src="item"
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

    <div @click="submit" class="t-button t-button-primary mt_40 ml_20" style="width: 100rpx;text-align:center">提交</div>
  </div>
</template>

<script>
/*eslint-disable*/
export default {
  data () {
    return {
      addNewType: false,
      routerList: [],
      routerIndex: 0,
      newRouter: '',
      toHouse: 1, // 1包邮
      radioList: [
        {
          id: 0,
          tags: '包邮',
          checked: true
        },
        {
          id: 1,
          tags: '不包邮'
        }
      ],
      goodsTitle: '',
      goodsPrice: '',
      goodsType: '',
      imgList: [],
      fileIDs: [],
    }
  },
  onShow () {
    this.getGoodsType()
  },
  methods: {
    getGoodsType () {
      this.$db.collection('routerList').get({
        success: res => {
          const tempRouter = []
          res.data.map(e => {
            tempRouter.push(e.name)
            this.routerList = tempRouter
          })
        }
      })
    },
    addType () {
      this.$db.collection('routerList').add({
        data: {
          name: this.newRouter
        },
        success: _ => {
          wx.showToast({
            title: '新增类别成功'
          })
          this.getGoodsType()
          this.addNewType = false
        }
      })
    },
    typeChange (e) {
      this.routerIndex = e.detail.value
    },
    radioChange (e) {
      e.detail.value ? this.toHouse = 0 : this.toHouse = 1
    },
    chooseImg () {
      let that = this
      that.imgList = []
      wx.chooseImage({
        count: 5,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success (res) {
          res.tempFiles.map(e => {
            that.imgList.push(e.path)
          })
        }
      })
    },
    submit () {
      if (this.goodsTitle && this.goodsPrice && this.imgList) {
        wx.showLoading({
          title: '提交中'
        })
        let promiseArr = []
        for (let i = 0;i <this.imgList.length;i++) {
          let filePath = this.imgList[i]
          let suffix = /\.[^\.]+$/.exec(filePath)[0]  // 文件后缀
          promiseArr.push(new Promise((reslove, reject) => {
            wx.cloud.uploadFile({
              cloudPath: new Date().getTime() + suffix,
              filePath: filePath
            }).then(res => {
              this.fileIDs = this.fileIDs.concat(res.fileID)
              reslove()
            }).catch(err => {
              console.log(err)
            })
          }))
        }
        Promise.all(promiseArr).then(res => {
          wx.cloud.callFunction({
            name: 'addGoods',
            data: {
              goodsTitle: this.goodsTitle,
              goodsPrice: this.goodsPrice,
              toHouse: this.toHouse,
              imgList: this.fileIDs,
              goodsType: this.routerList[this.routerIndex]
            },
            success: _ => {
              wx.hideLoading()
              wx.showToast({
                title: '提交成功',
                success: _ => {
                  this.goodsTitle = ''
                  this.goodsPrice = ''
                  this.imgList = []
                }
              })
            }
          })
        })
        // this.$db.collection('goods').add({
        //   data: {
        //     goodsDetail: {
        //       name: this.goodsTitle,
        //       price: this.goodsPrice,
        //       tags: this.toHouse,
        //       url: this.imgList
        //     },
        //     recommend: false,
        //     goodsType: this.routerList[this.routerIndex]
        //   },
        //   success: _ => {
        //     wx.showToast({
        //       title: '提交成功',
        //       success: _ => {
        //         this.goodsTitle = ''
        //         this.goodsPrice = ''
        //         this.imgList = []
        //       }
        //     })
        //   }
        // })
      } else {
        wx.showToast({
          title: '带有*号为必填选项',
          icon: 'none'
        })
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.content-length {
  position: absolute;
  right: 20rpx;
  bottom: 10rpx;
}
</style>
