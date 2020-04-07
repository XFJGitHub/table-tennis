<config>
  {
    'navigationBarTitleText': '娱乐中心'
  }
</config>
<template>
  <div>
    <scroll-view>
      <div class="tables-wrap">
        <div class="line_height1 flex_column align_center" v-for="(item, index) in tableList" :key="index">
          <img style="width:300rpx;height:300rpx;" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4133050358,1709979582&fm=26&gp=0.jpg">
          <div>
            <div class="table-title">{{item.name}}</div>
            <div class="table-title">￥{{item.price}}</div>
          </div>
          <div class="flex">
            <button>预约</button>
            <button type="primary">开台</button>
          </div>
        </div>
      </div>
    </scroll-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableList: [
        {
          name: '星牌-1',
          price: '30'
        },
        {
          name: '乔氏-1',
          price: '30'
        },
        {
          name: '乔氏-2',
          price: '30'
        },
        {
          name: '普通-1',
          price: '18'
        }
      ]
    }
  }
}
</script>

<style lang='scss'>
page {
  background: #F4F4F4;
}
.tables-wrap {
  border-radius: 30rpx;
  padding: 40rpx;
  margin: 20rpx;
  background: white;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .table-title {
    color: $title;
    font-size: 12rpx;
  }
}
</style>
