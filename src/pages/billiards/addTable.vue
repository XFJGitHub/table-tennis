<template>
  <div>
    <div class="flex border_bottom p_20">
      球桌品牌:<input class="ml_10" placeholder="请输入添加的球桌品牌" type="text" v-model="tableBrand">
    </div>
    <div class="flex border_bottom p_20">
      球桌编号:<input class="ml_10" placeholder="请输入添加的球桌编号" type="text" v-model="tableName">
    </div>
    <div class="flex border_bottom p_20">
      球桌价格:<input class="ml_10" placeholder="请输入添加的球桌价格" type="number" v-model="tablePrice">
    </div>
    <div class="t-button t-button-primary m_20" @click="submit">确认添加</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableBrand: '',
      tableName: '',
      tablePrice: ''
    }
  },
  methods: {
    submit () {
      if (this.tableBrand && this.tableName && this.tablePrice) {
        this.$db.collection('tables').add({
          data: {
            disable: false,
            isUsing: false,
            useName: '',
            brand: this.tableBrand,
            name: this.tableName,
            price: this.tablePrice,
            startTime: ''
          },
          success: _ => {
            wx.showToast({
              title: '添加成功',
              success: _ => {
                wx.navigateTo({
                  url: '/pages/billiards/managementTable',
                  success: _ => {
                    setTimeout(_ => {
                      wx.navigateBack({
                        delta: 2
                      }, 1500)
                    })
                  }
                })
              }
            })
          }
        })
      }
    }
  }
}
</script>

<style lang='scss'>
</style>
