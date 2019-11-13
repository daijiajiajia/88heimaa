<template>
<!-- 布局 -->
<el-container>
  <!-- 先左右布局 -->
  <!-- 侧边栏布局 -->
  <el-aside></el-aside>
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
