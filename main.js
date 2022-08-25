import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import store from './store'
import './static/font/iconfont.css'
import Clipboard from 'clipboard'


Vue.use(ElementUI)
App.mpType = 'app'
Vue.prototype.$store = store
Vue.prototype.Clipboard = Clipboard
Vue.config.productionTip = false
const app = new Vue({
    ...App
})
app.$mount()
