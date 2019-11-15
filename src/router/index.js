import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/layout'
import login from '../views/login'
import Home from '@/views/home'
import Article from '@/views/article'
import Publish from '@/views/publish'
Vue.use(VueRouter)

const routes = [
  // {
//   path: '/',
//   redirect: '/layout'
// },
// 一极路由主页 最外边的壳子
  {
    path: '/',
    component: Layout,
    children: [
      { // 首页
        path: '', // 默认子路由不填就是这个
        component: Home
      }, { // 文章列表
        path: '/article',
        component: Article
      }, { // 发布文章
        path: '/publish',
        component: Publish
      }
    ]
  }, {
    path: '/login',
    component: login
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

// 路由的拦截器 beforeEach 方法，该方法接收一个函数作为参数
// 参数1：to，表示去哪里的路由信息
// 参数2：from，表示来自哪里的路由信息
// 参数3：next，他是一个方法，用于路由放行
export default router
