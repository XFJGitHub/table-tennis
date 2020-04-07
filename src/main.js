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

export default {
  config: {
    // pages 的首个页面会被编译成首页
    pages: [
      'pages/billiards/billiards',
      'pages/index/index',
      'pages/mall/mall',
      'pages/video/video',
      'pages/my/my'
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
          iconPath: 'native/tabbar/home.png',
          selectedIconPath: 'native/tabbar/home_on.png'
        },
        {
          pagePath: 'pages/video/video',
          text: '社区',
          iconPath: 'native/tabbar/mine.png',
          selectedIconPath: 'native/tabbar/mine_on.png'
        },
        {
          pagePath: 'pages/mall/mall',
          text: '商城',
          iconPath: 'native/tabbar/home.png',
          selectedIconPath: 'native/tabbar/home_on.png'
        },
        {
          pagePath: 'pages/my/my',
          text: '我的',
          iconPath: 'native/tabbar/vue.png',
          selectedIconPath: 'native/tabbar/vue_on.png'
        }
      ]
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '台球厅',
      navigationBarTextStyle: 'black'
    }
  }
}
