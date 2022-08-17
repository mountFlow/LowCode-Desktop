import App from './App'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// #ifndef VUE3
import Vue from 'vue'
import store from './store'
Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$store = store
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  app.use(ElementPlus)
  return {
    app
  }
}
// #endif