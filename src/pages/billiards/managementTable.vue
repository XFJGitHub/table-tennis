<config>
  {
    'navigationBarTitleText': '管理球桌',
    'enablePullDownRefresh': true
  }
</config>
<template>
  <div class="mg-table">
    <div style="border:1px solid #e5e5e5">
      <div class="table-head">
        <div style="width:200rpx">球桌编号</div>
        <div style="width:170rpx">球桌价格</div>
        <div style="width:160rpx">上/下架</div>
        <div style="width:200rpx">操作区</div>
      </div>
      <div class="flex align_center py_20" v-for="(item, ind) in tableList" :key="ind">
        <div class="flex">
          <input type="text" placeholder="输入球桌编号" style="width:200rpx" v-if="isEdit && tableId === item._id" v-model="tableName">
          <div v-else style="width:200rpx" class="text-ellipsis">{{item.name}}</div>
          <input type="text" placeholder="输入价格" style="width:170rpx" v-if="isEdit && tableId === item._id" v-model="tablePrice">
          <div v-else style="width:170rpx">{{item.price}}</div>
          <switch style="width:180rpx;zoom:.8" :checked="!item.disable" @change="changeStatus(item)"/>
        </div>
        <div class="flex">
          <i @click="submitTable(item._id)" v-if="isEdit && tableId === item._id" class="icon_submit" />
          <i @click="editTable(item)" v-else class="icon_edit" />
          <i @click="deleteTable(item._id)" class="ml_20 icon_delete" />
        </div>
      </div>
      <div @click="addTable" class="table-add">
        <i class="icon_add"></i>
        <div class="ml_20">添加球桌</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isEdit: false,
      tableList: [],
      tableStatus: '',
      tableId: '',
      tableName: '',
      tablePrice: ''
    }
  },
  onPullDownRefresh () {
    this.getData()
    wx.stopPullDownRefresh()
  },
  onLoad () {
    this.getData()
  },
  methods: {
    getData () {
      this.$db.collection('tables').get({
        success: res => {
          this.tableList = res.data
        }
      })
    },
    changeStatus (row) {
      this.$db.collection('tables').where({
        _id: row._id
      }).update({
        data: {
          disable: !row.disable
        }
      })
    },
    editTable (row) {
      this.isEdit = true
      this.tableId = row._id
    },
    deleteTable (id) {
      this.$db.collection('tables').where({
        _id: id
      }).remove({
        success: _ => {
          wx.showToast({
            title: '删除球桌成功',
            success: _ => {
              this.getData()
            }
          })
        }
      })
    },
    submitTable (id) {
      if (this.tableName && this.tablePrice) {
        this.$db.collection('tables').where({
          _id: id
        }).update({
          data: {
            price: this.tablePrice,
            name: this.tableName
          },
          success: _ => {
            this.isEdit = false
            wx.showToast({
              title: '修改球桌信息成功',
              success: _ => {
                this.getData()
              }
            })
          }
        })
      } else {
        wx.showToast({
          title: '请检查球桌编号和价格是否都填写',
          icon: 'none'
        })
      }
    },
    addTable () {
      wx.navigateTo({
        url: '/pages/billiards/addTable'
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
