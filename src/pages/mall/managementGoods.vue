<config>
  {
    'navigationBarTitleText': '管理商品',
    'enablePullDownRefresh': true
  }
</config>
<template>
  <div class="mg-table">
    <div style="border:1px solid #e5e5e5">
      <div class="table-head">
        <div style="width:200rpx">商品名</div>
        <div style="width:170rpx">商品价格</div>
        <div style="width:160rpx">推荐商品</div>
        <div style="width:200rpx">操作区</div>
      </div>
      <div class="flex align_center py_20" v-for="(item, ind) in dataList" :key="ind">
        <div class="flex">
          <input type="text" placeholder="输入商品名" style="width:200rpx" v-if="isEdit && goodsId === item._id" v-model="goodsName">
          <div v-else style="width:200rpx" class="text-ellipsis">{{item.goodsDetail.name}}</div>
          <input type="text" placeholder="输入价格" style="width:180rpx" v-if="isEdit && goodsId === item._id" v-model="goodsPrice">
          <div v-else style="width:180rpx">{{item.goodsDetail.price}}</div>
          <switch style="width:180rpx;zoom:.7" :checked="item.recommend" @change="changeStatus(item)"/>
        </div>
        <div class="flex ml_20">
          <i @click="submitTable(item._id)" v-if="isEdit && goodsId === item._id" class="icon_submit" />
          <i @click="editTable(item)" v-else class="icon_edit" />
          <i @click="deleteTable(item._id)" class="ml_20 icon_delete" />
          <i @click="isEdit = false" v-if="isEdit && goodsId === item._id" class="ml_20 icon_cancel_small" />
        </div>
      </div>
      <div @click="addGoods" class="table-add">
        <i class="icon_add"></i>
        <div class="ml_20">添加商品</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isEdit: false,
      dataList: [],
      goodsId: '',
      goodsName: '',
      goodsPrice: ''
    }
  },
  onPullDownRefresh () {
    this.getData()
    wx.stopPullDownRefresh()
  },
  onShow () {
    this.getData()
  },
  methods: {
    getData () {
      wx.cloud.callFunction({
        name: 'getGoods',
        data: {
          goodsType: ''
        },
        success: res => {
          this.dataList = res.result.data
        }
      })
    },
    changeStatus (row) {
      wx.cloud.callFunction({
        name: 'goodsRecommend',
        data: {
          id: row._id,
          recommend: !row.recommend
        },
        success: _ => {
          this.getData()
        }
      })
    },
    editTable (row) {
      this.isEdit = true
      this.goodsId = row._id
    },
    deleteTable (id) {
      wx.cloud.callFunction({
        name: 'deleteGoods',
        data: {
          id: id
        },
        success: _ => {
          this.getData()
          wx.showToast({
            title: '删除商品成功'
          })
        }
      })
      // this.$db.collection('goods').where({
      //   _id: id
      // }).remove({
      //   success: _ => {
      //     console.log(_)
      //     wx.showToast({
      //       title: '删除商品成功',
      //       success: _ => {
      //         this.getData()
      //       }
      //     })
      //   },
      //   fail: err => {
      //     console.log(err)
      //   }
      // })
    },
    submitTable (id) {
      if (this.goodsName && this.goodsPrice) {
        this.$db.collection('goods').where({
          _id: id
        }).update({
          data: {
            goodsDetail: {
              price: this.goodsPrice,
              name: this.goodsName
            }
          },
          success: _ => {
            this.isEdit = false
            wx.showToast({
              title: '修改商品信息成功',
              success: _ => {
                this.getData()
              }
            })
          }
        })
      } else {
        wx.showToast({
          title: '请检查商品名和价格是否都填写',
          icon: 'none'
        })
      }
    },
    addGoods () {
      wx.navigateTo({
        url: '/pages/mall/addGoods'
      })
    }
  }
}
</script>

<style lang='scss'>
.mg-table {
  margin: 0 20rpx;
  .table-head {
    display: flex;
    border-bottom: 1px solid #e5e5e5;
    background: #fcf6f6;
  }
  .table-add {
    border-top: 1px solid #e5e5e5;
    padding: 20rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
