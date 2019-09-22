import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import store from './store'

Vue.config.productionTip = false

Vue.use(ElementUI)
App.mpType = 'app'
Vue.prototype.$store = store

const app = new Vue({
    ...App
})
app.$mount()
