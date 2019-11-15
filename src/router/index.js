import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout'
import login from '../views/login'
import Home from '@/views/home'
import Article from '@/views/article'
import Publish from '@/views/publish'

// 加载nprogress
import Nprogress from 'nprogress'

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
// 我们具体要做的就是：判断用户的登录状态，有就通过，没有就跳转到登陆页
router.beforeEach((to, from, next) => {
  console.log('beforeeach导航前')
  // 这里用到一个插件 导入一个进度条
  Nprogress.start()

  // 停止导航
  // 我们可以在一些特殊情况下，停留在当前页面，中断当前导航
  // next(false)
  // next()

  // 如果访问的是登陆页面就直接放行
  if (to.path === '/login') {
    next()
    Nprogress.done()
    return // 停止代码继续执行
  }

  // 2.非登陆页面，校验登录状态
  // 2.1获取用户 token
  const token = window.localStorage.getItem('user-token')

  // 2.2 判断是否有token通过，有就通过
  if (token) {
    // 导航通过，放行，访问哪里就去哪里
    next()
  } else {
    // 2.3没有，就跳转到登陆页
    next('/login') // 跳转到指定路径
  }

  // 如果在登陆页并且是非登陆状态访问非登陆页面，
  // 这里手动的终止进度条 ，否则进度条不会停止
  Nprogress.done()
})

// 路由导航结束以后触发的钩子函数
router.afterEach((to, from) => {
  console.log('aftereach导航完成')
  // 结束顶部的导航进度条
})
export default router
