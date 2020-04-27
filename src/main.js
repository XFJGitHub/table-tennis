import App from './App'
import Vue from 'vue'
import VHtmlPlugin from '@megalo/vhtml-plugin'
import Vuex from 'vuex'
import '@/static/styles/common.scss'

Vue.use(VHtmlPlugin)
Vue.use(Vuex)

const store = require('./store').default
Vue.prototype.$store = store

const app = new Vue(App)

app.$mount()

wx.cloud.init({
  env: 'table-waxhn',
  traceUser: true
})
Vue.prototype.$db = wx.cloud.database()

export default {
  config: {
    // pages 的首个页面会被编译成首页
    pages: [
      'pages/index/index',
      'pages/billiards/billiards',
      'pages/billiards/billiardsDetail',
      'pages/billiards/managementTable',
      'pages/billiards/addTable',
      'pages/billiards/appointment',
      'pages/video/video',
      'pages/video/articleDetail',
      'pages/mall/mall',
      'pages/mall/shoppingCar',
      'pages/mall/goodsDetail',
      'pages/mall/orderList',
      'pages/mall/orderDetail',
      'pages/my/my',
      'pages/my/advice',
      'pages/my/recharge',
      'pages/my/bill',
      'pages/my/billDetail',
      'pages/my/report/allIncome',
      'pages/my/report/everyDayIncome',
      'pages/my/report/dayUsingInfo',
      'pages/my/setting'
    ],
    tabBar: {
      color: '#333',
      selectedColor: '#007d37',
      list: [
        {
          pagePath: 'pages/index/index',
          text: '首页',
          iconPath: 'native/tabbar/home.png',
          selectedIconPath: 'native/tabbar/home_on.png'
        },
        {
          pagePath: 'pages/billiards/billiards',
          text: '台球',
          iconPath: 'native/tabbar/taiqiu.png',
          selectedIconPath: 'native/tabbar/taiqiu_on.png'
        },
        {
          pagePath: 'pages/video/video',
          text: '社区',
          iconPath: 'native/tabbar/video.png',
          selectedIconPath: 'native/tabbar/video_on.png'
        },
        {
          pagePath: 'pages/mall/mall',
          text: '商城',
          iconPath: 'native/tabbar/shopping.png',
          selectedIconPath: 'native/tabbar/shopping_on.png'
        },
        {
          pagePath: 'pages/my/my',
          text: '我的',
          iconPath: 'native/tabbar/mine.png',
          selectedIconPath: 'native/tabbar/mine_on.png'
        }
      ]
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'EGE Clube',
      navigationBarTextStyle: 'black'
    }
    // usingComponents: {
    //   'i-button': './static/dist/button/index'
    // }
  }
}
