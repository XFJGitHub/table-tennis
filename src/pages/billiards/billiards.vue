<config>
  {
    'navigationBarTitleText': '娱乐中心'
  }
</config>
<template>
  <div>
    <div class="tables-wrap">
      <scroll-view
        style="height:1000rpx"
        scroll-y
      >
        <div class="scroll-wrap">
          <div class="line_height1 mb_10 flex_column align_center" v-for="(item, index) in tableList" :key="index">
            <img style="width:300rpx;height:300rpx;" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4133050358,1709979582&fm=26&gp=0.jpg">
            <div class="my_20">
              <div class="table-title">{{item.name}}</div>
              <div class="table-title mt_20">￥{{item.price}}</div>
            </div>
            <div class="flex">
              <button class="t-button mr_20">预约</button>
              <button class="t-button t-button-primary">开台</button>
            </div>
          </div>
        </div>
      </scroll-view>
    </div>

    <div class="tables-wrap mt_20">
      <div class="flex">
        <div>开始时间：</div>
        <div>{{startTime}}</div>
      </div>
      <div class="flex">
        <div>结束时间：</div>
        <div>{{endTime}}</div>
      </div>
    </div>

    <button class="close-button">结账</button>
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
      ],
      startTime: '14:22',
      endTime: '15:22'
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
  .scroll-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .table-title {
      color: #464c5b;
      font-size: 28rpx;
    }
  }
}
.close-button {
  text-align: center;
  width: 500px;
  padding: 16px 0;
  margin-bottom: 20px;
  color: white;
  background: #3399FF;
}
</style>
