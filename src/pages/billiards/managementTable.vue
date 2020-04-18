<config>
  {
    'navigationBarTitleText': '管理球桌'
  }
</config>
<template>
  <div class="mg-table">
    <div style="border:1px solid #e5e5e5">
      <div class="table-head">
        <div style="width:200rpx">球桌名</div>
        <div style="width:170rpx">球桌价格</div>
        <div style="width:160rpx">上/下架</div>
        <div style="width:200rpx">操作区</div>
      </div>
      <div class="flex align_center py_20" v-for="(item, ind) in tableList" :key="ind">
        <div class="flex">
          <div style="width:200rpx" class="text-ellipsis">{{item.name}}</div>
          <div style="width:170rpx">{{item.price}}</div>
          <switch style="width:180rpx;zoom:.8" :checked="item.status" @change="changeStatus"/>
        </div>
        <div class="flex">
          <i class="icon_edit" />
          <i class="ml_20 icon_delete" />
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
      tableList: [],
      tableStatus: ''
    }
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
