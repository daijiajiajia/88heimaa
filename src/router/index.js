import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout'
import login from '../views/login'
import Home from '@/views/home'
import Article from '@/views/articles' // 文章列表
import Publish from '@/views/publish' // 发布文章
import Comment from '@/views/comment' // 评论列表
import CommentList from '@/views/comment-list' // 评论详情
import Media from '@/views/media' // 素材管理
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
      },
      // 如果从a路由跳到b路由
      // 两个，如果两个路由使用同一个组件，那么这个组件不会从新渲染
      // 正常的路由跳转，会销毁离开的组件，渲染新匹配到的组件
      // 组件销毁  也就意味着  数据都被清除  当发现两个路由共用一个组价 他是复用了-缓存了
      { // 发布文章
        path: '/publish/:articleId',
        component: Publish
      },
      { // 评论列表
        path: '/comment',
        component: Comment
      },
      { // 点击修改
        path: '/comment/:articleId',
        component: CommentList,
        // 将路由参数映射给组件的props数据,这样获取参数更方便
        props: true
      },
      { // 评论列表
        path: '/media',
        component: Media
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
