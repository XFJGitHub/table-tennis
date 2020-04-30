<config>
  {
    'navigationBarTitleText': '商城中心'
  }
</config>
<template>
  <div class="flex_column h_100">
    <div>
      <!-- <div class="mall-head_wrap">
        <div class="search_wrap">
          <input
          v-model="keyword"
          style="width: 100%;"
          type="text"
          placeholder="请输入查询的商品名称"
          confirm-type="search"
          >
          <i class="icon_search" @click="search"></i>
        </div>
      </div> -->

      <!-- <div style="width: 100%;height: 280rpx;">
        <img :src="advertingUrl" style="width:100%;height:100%">
      </div> -->
    </div>

    <div class="flex flex-grow">
      <div class="left-sidebar">
        <div
          class="sidebar-name"
          v-for="(item, index) in routerList"
          :key="index"
          @click="changeRouter(item, index)"
          :class="active === index ? 'router_active' : ''"
        >
          {{item.name}}
        </div>
      </div>
      <div v-if="goodsList.length > 0" class="right-content relative">
        <movable-area class="w_100 h_100">
          <div
            class="flex ml_20 mb_20"
            v-for="(ite) in goodsList"
            :key="ite.id"
            @click="toGoodsDetail(ite)"
          >
            <div style="width: 200rpx;height:200rpx">
              <img style="width:100%;height:100%;border-radius:20rpx" :src="ite.goodsDetail.url[0]">
            </div>
            <div class="goods_wrap">
              <div style="width: 300rpx;" class="text-ellipsis">{{ite.goodsDetail.name}}</div>
              <div v-if="ite.goodsDetail.tags !== 0" class="goods-tags">包邮</div>
              <div class="goods-price">
                ￥<span class="fontsize_40">{{ite.goodsDetail.price}}</span>
              </div>
            </div>
          </div>
          <movable-view direction="all" :x="x" :y="y">
            <div @click="joinShoppingCar" style="width:80rpx" class="relative">
              <i class="icon_shoppingCar" />
              <div class="shopping-car-count">{{totalCount}}</div>
            </div>
          </movable-view>
        </movable-area>
      </div>
      <div class="align_center flex_column" style="margin-left:140rpx;" v-else>
        <img style="margin-top: 200rpx;width: 280rpx;height:200rpx" src="https://static.dingdandao.com/612007ba2dc43b5c6646f19fe54a4206">
        <div style="color: #a3b1bf" class="mt_20 fontsize_26">暂无商品</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      x: 200,
      y: 370,
      keyword: '',
      active: 0,
      currentRouter: '',
      advertingUrl: '',
      totalCount: 0,
      routerList: [],
      goodsList: []
    }
  },
  methods: {
    getData () {
      const db = wx.cloud.database()
      db.collection('goods').where({
        goodsType: this.currentRouter
      }).get({
        success: res => {
          this.goodsList = res.data
        }
      })
      wx.cloud.callFunction({
        name: 'getShoppingCount',
        data: {
          openid: Megalo.getStorageSync('openid')
        },
        success: res => {
          console.log(res)
          this.totalCount = res.result.total
        }
      })
      // db.collection('mall').get({
      //   success: res => {
      //     this.advertingUrl = res.data[0].advertingUrl
      //   }
      // })
    },
    getRouterList () {
      this.$db.collection('routerList').get({
        success: res => {
          this.routerList = res.data
          this.currentRouter = res.data[0].name
          this.getData()
        }
      })
    },
    changeRouter (item, ind) {
      this.currentRouter = item.name
      this.active = ind
      this.getData()
    },
    joinShoppingCar () {
      wx.navigateTo({
        url: '/pages/mall/shoppingCar'
      })
    },
    toGoodsDetail (val) {
      wx.navigateTo({
        url: `/pages/mall/goodsDetail?goodsId=${val._id}`
      })
    }
    // search () {
    //   this.$db.collection('goods').where({
    //     'goodsDetail.name': this.keyword
    //   }).get({
    //     success: res => {
    //       this.goodsList = res.data
    //       this.active = undefined
    //     }
    //   })
    // }
  },
  onShow () {
    this.getRouterList()
  }
}
</script>

<style lang='scss'>
page {
  height: 100%;
}
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
  // background: #2494E8;
  // background: #bce4e6;
  background: #161719;
  text-align: left;
  .sidebar-name {
    font-size: 28rpx;
    color: white;
    // margin: 0 20rpx;
    padding: 20rpx 0rpx 20rpx 50rpx;
    // border-bottom: 1px solid #fff;
    // &:not(:last-child) {
      // border-bottom: 1px solid #e5e5e5;
    // }
  }
  .router_active {
    // color: #74b283
    background: #fe5713
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
.shopping-car-count {
  border-radius: 50%;
  background: crimson;
  color: #fff;
  width: 40rpx;
  height: 40rpx;
  font-size: 25rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -10rpx;
  left: 50rpx;
}
</style>
