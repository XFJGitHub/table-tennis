<config>
  {
    'navigationBarTitleText': '商城中心'
  }
</config>
<template>
  <div>
    <div class="mall-head_wrap">
      <div class="search_wrap">
        <input
        v-model="keyword"
        style="width: 100%;"
        type="text"
        placeholder="请输入相关商品"
        confirm-type="search"
        >
        <i class="icon_search"></i>
      </div>
    </div>

    <div style="width: 100%;height: 140rpx;">
      <img :src="advertingUrl" style="width:100%;height:100%">
    </div>

    <div class="flex">
      <div class="left-sidebar">
        <div class="sidebar-name" v-for="(item, index) in routerList" :key="index">
          {{item.name}}
        </div>
      </div>
      <div class="right-content">
        <div class="flex ml_20 mt_10" v-for="(ite, ind) in goodsList" :key="ite.id+ind">
          <div style="width: 200rpx;height:200rpx">
            <img style="width:100%;height:100%;border-radius:20rpx" :src="ite.url">
          </div>
          <div class="goods_wrap">
            <div style="width: 300rpx;" class="text-ellipsis">{{ite.title}}</div>
            <div v-if="ite.tags !== 0" class="goods-tags">包邮</div>
            <div class="goods-price">
              ￥<span class="fontsize_40">{{ite.price}}</span>.00
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      keyword: '',
      advertingUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2292788998,2636499574&fm=26&gp=0.jpg',
      routerList: [
        {
          id: 0,
          name: '台球'
        },
        {
          id: 1,
          name: '台球杆'
        }
      ],
      goodsList: [
        {
          id: 0,
          url: 'http://img2.imgtn.bdimg.com/it/u=4288298065,3108720683&fm=26&gp=0.jpg',
          title: '金丝台球杆阿斯顿ad撒旦是ad撒旦撒打算多少打算打',
          tags: 1,
          price: 123
        },
        {
          id: 0,
          url: 'http://img2.imgtn.bdimg.com/it/u=4288298065,3108720683&fm=26&gp=0.jpg',
          title: '金丝台球杆阿斯顿ad撒旦是ad撒旦撒打算多少打算打',
          tags: 1,
          price: 123
        },
        {
          id: 0,
          url: 'http://img2.imgtn.bdimg.com/it/u=4288298065,3108720683&fm=26&gp=0.jpg',
          title: '金丝台球杆阿斯顿ad撒旦是ad撒旦撒打算多少打算打',
          tags: 1,
          price: 123
        },
        {
          id: 0,
          url: 'http://img2.imgtn.bdimg.com/it/u=4288298065,3108720683&fm=26&gp=0.jpg',
          title: '金丝台球杆阿斯顿ad撒旦是ad撒旦撒打算多少打算打',
          tags: 1,
          price: 123
        },
        {
          id: 0,
          url: 'http://img2.imgtn.bdimg.com/it/u=4288298065,3108720683&fm=26&gp=0.jpg',
          title: '金丝台球杆阿斯顿ad撒旦是ad撒旦撒打算多少打算打',
          tags: 1,
          price: 123
        },
        {
          id: 0,
          url: 'http://img2.imgtn.bdimg.com/it/u=4288298065,3108720683&fm=26&gp=0.jpg',
          title: '金丝台球杆阿斯顿ad撒旦是ad撒旦撒打算多少打算打',
          tags: 1,
          price: 123
        }
      ]
    }
  }
}
</script>

<style lang='scss'>
.mall-head_wrap {
  background: #e8e8e8;
  padding: 15rpx;
  .search_wrap {
    background: white;
    padding: 10rpx;
    display: flex;
    font-size: 25rpx;
    justify-content: space-between;
    align-content: center;
    border: 1px solid #e5e5e5;
  }
}

.left-sidebar {
  width: 200rpx;
  background: #2494E8;
  text-align: left;
  .sidebar-name {
    font-size: 28rpx;
    color: white;
    margin: 0 10rpx;
    padding: 20rpx 0rpx 20rpx 40rpx;
    &:not(last-child) {
      border-bottom: 1px solid #e5e5e5;
    }
  }
}
.right-content {
  flex-grow: 1;
  .goods_wrap {
    margin-left: 20rpx;
    .goods-tags {
      margin-top: 20rpx;
      background: rgba(255, 236, 214, 1.0);
      width: 40rpx;
      color: #f3704b;
      padding: 5rpx 10rpx;
      border-radius: 10rpx;
      font-size: 20rpx;
      flex-shrink: 0;
    }
    .goods-price {
      margin-top: 40rpx;
      font-size: 24rpx;
      color: #fd7659;
    }
  }
}
</style>
