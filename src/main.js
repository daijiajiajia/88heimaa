import Vue from 'vue'
import App from './App.vue'
import router from './router'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less'
import 'nprogress/nprogress.css'
import JSONbig from 'json-bigint'
import axios from 'axios' // 引入axios在运行时依赖
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 设置 axios的常态地址
// axios默认会把后端返回的数据使用json。parse转为对象给我们使用
// 同时他也提供了让我们自定义转换的功能
// axios 在收到响应数据之后就会经过这里
axios.defaults.transformResponse = [function (data, headers) {
  // console.log('后端原始数据', data)  data是一坨字符串
  // axios 默认使用json.parse
  // 我们这里手动配置使用Jsonbig.parse(data)
  // 任何接口都会返回数据
  // 删除操作后端返回的是空数据
  // 空数据一经转换就报错了
  // 把导致出错的代码放到try里面
  try {
    return JSONbig.parse(data)
  } catch (err) {
    console.log(err)
    return {}
  }
}]

// axios的请求拦截器
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
//  在请求拦截器函数中的 config 是本次请求相关的配置对象
// config  就是最后要发给后端的哪个配置对象
// 我们可以在拦截器中 对 config 进行统一的配置对象
  console.log('请求拦截器', config)

  const token = window.localStorage.getItem('user-token')
  // 统一添加token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  // return config 是通行的规则
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// axios响应拦截器
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})
Vue.prototype.$axios = axios // 将axios共享给所有的实例使用 以后使用都可以直接使用 this.$axios
Vue.use(elementUI) // 注册整个的所有的element组件 vue.use调用elementui里面的一个方法 install=> 调用时 传入了vue对象
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
