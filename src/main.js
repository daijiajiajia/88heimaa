import Vue from 'vue'
import App from './App.vue'
import router from './router'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less'
import axios from 'axios' // 引入axios在运行时依赖
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 设置 axios的常态地址
Vue.prototype.$axios = axios // 将axios共享给所有的实例使用 以后使用都可以直接使用 this.$axios
Vue.use(elementUI) // 注册整个的所有的element组件 vue.use调用elementui里面的一个方法 install=> 调用时 传入了vue对象
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
