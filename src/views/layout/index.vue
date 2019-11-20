<template>
<!-- 布局 -->
<el-container>
  <!-- 先左右布局 -->
  <!-- 侧边栏布局 -->
  <el-aside class='left' style='width:220px'>
     <!-- 侧边栏图标 -->

    <!-- <el-col :span="24" style="height:100vh"> -->
      <div class='menu-title'  style="background-color:#2e2f32">
      <img src="../../assets/img/logo_admin.png" alt="">
      </div>
         <!-- 左侧菜单 el-menu有一个router控制路由，启用该模式会在激活导航时以index为path进行路由跳转 -->
      <el-menu
        style='width:221px'
          background-color='#323745'
          text-color='#adafb5'
          active-text-color='#ffd04b'
          router
          >
          <!-- 一级菜单 -->
          <el-menu-item index='/'>首页</el-menu-item>
          <!-- 二级菜单 -->
          <el-submenu index='1'>
            <!-- 具名插槽 -->
            <template slot='title'>内容管理</template>
            <el-menu-item index='/publish'>发布文章</el-menu-item>
            <el-menu-item index='/article'>内容列表</el-menu-item>
            <el-menu-item index='/comment'>评论列表</el-menu-item>
            <el-menu-item index='/media'>素材管理</el-menu-item>
          </el-submenu>
          <!-- 二级菜单 -->
          <el-submenu index='2'>
            <!-- 具名插槽 -->
            <template slot='title'>粉丝管理</template>
            <el-menu-item>图文数据</el-menu-item>
            <el-menu-item>粉丝概况</el-menu-item>
            <el-menu-item>粉丝画像</el-menu-item>
            <el-menu-item>粉丝列表</el-menu-item>
          </el-submenu>
          <!-- 一级菜单 -->
          <el-menu-item index='/account'>账户信息</el-menu-item>
      </el-menu>
    <!-- </el-col> -->

 </el-aside>
  <!-- 右边布局 -->
  <el-container>
    <!-- 又分为上下布局 -->
    <el-header>
      <layout-header></layout-header>
    </el-header>
    <el-main>
      <!-- 二级路由容器 -->
      <!-- 只需要在这里上增加一个key。就可以禁用路由缓存功能 -->
      <!-- 绑定的key 唯一即可 path 是路径 -->
      <router-view :key='$route.path'></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
// 导入组件
import layoutHeader from '../../components/layout-header'
export default {
  name: 'home',
  components: {
    'layout-header': layoutHeader
  }
}
</script>
<style lang="less" scoped>
.left{
  background-color: #353b4e;
  width: 220px;
  height: 100vh;
  overflow: hidden;
  .menu-title{
    background-color: #2e2f32;
   padding:10px 0;
   text-align: center;
  }
  img{
    height: 30px;
  }
}
</style>
