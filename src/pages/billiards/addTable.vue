<template>
  <div>
    <div class="flex border_bottom p_20">
      球桌名:<input class="ml_10" placeholder="请输入添加的球桌名" type="text" v-model="tableName">
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
      tableName: '',
      tablePrice: ''
    }
  },
  methods: {
    submit () {
      this.$db.collection('tables').add({
        data: {
          disable: false,
          isUsing: false,
          useName: '',
          name: this.tableName,
          price: this.tablePrice,
          startTime: ''
        },
        success: _ => {
          wx.showToast({
            title: '添加成功',
            success: _ => {
              wx.navigateTo({
                url: '/pages/billiards/managementTable'
              })
            }
          })
        }
      })
    }
  }
}
</script>

<style lang='scss'>
</style>
