import App from './App'
import store from './store'
import './style/global.scss'
import './style/article-detail.scss'
import * as filters from './filters'

//注册过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App,
  store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
