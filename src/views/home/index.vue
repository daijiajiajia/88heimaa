<template>
<!-- 布局 -->
<el-container>
  <!-- 先左右布局 -->
  <!-- 侧边栏布局 -->
  <el-aside class='left' style='width:220px'>
    <!-- 侧边栏图标 -->
    <div class='menu-title'>
      <img src="../../assets/img/logo_admin.png" alt="">
    </div>
    <!-- 左侧菜单 -->
    <el-menu style='width:221px' background-color='#323745' text-color='#adafb5' active-text-color=' #ffd04b'>
      <!-- 一级菜单 -->
      <el-menu-item>首页</el-menu-item>
      <!-- 二级菜单 -->
      <el-submenu>
        <!-- 具名插槽 -->
        <template slot='title'>内容管理</template>
         <el-menu-item>发布文章</el-menu-item>
         <el-menu-item>内容列表</el-menu-item>
         <el-menu-item>评论列表</el-menu-item>
         <el-menu-item>素材管理</el-menu-item>
      </el-submenu>
      <!-- 二级菜单 -->
      <el-submenu>
        <!-- 具名插槽 -->
        <template slot='title'>粉丝管理</template>
         <el-menu-item>图文数据</el-menu-item>
         <el-menu-item>粉丝概况</el-menu-item>
         <el-menu-item>粉丝画像</el-menu-item>
         <el-menu-item>粉丝列表</el-menu-item>
      </el-submenu>
      <!-- 一级菜单 -->
      <el-menu-item>账户信息</el-menu-item>
    </el-menu>
  </el-aside>
  <!-- 右边布局 -->
  <el-container>
    <!-- 又分为上下布局 -->
    <el-header></el-header>
    <el-main>
      <!-- 二级路由容器 -->
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>

export default {
  name: 'home',
  components: {

  }
}
</script>
<style lang="less" scoped>
.left{
  background-color: #353b4e;
  height: 100vh;
  overflow: hidden;
  .menu-title{
    background-color: #2e2f32;
   padding:10px;
   text-align: center;
  }
  img{
    height: 30px;
  }
}
</style>
