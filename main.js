import App from './App'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import 'element-plus/dist/index.css'
export function createApp() {
  const app = createSSRApp(App)
  app.use(ElementPlus)
  return {
    app
  }
}
// #endif