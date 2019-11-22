<template>
  <el-row type='flex' justify='space-between' align='middle'>
      <!-- 左侧 -->
      <el-col :span='6' class='left'>
          <i class='el-icon-s-fold'></i>
          <span>江苏传智播客教育科技股份有限公司</span>
      </el-col>
      <!-- 右侧 -->
      <el-col :span='3' class='right'>
          <!-- 头像 -->
          <img height='50' :src="user.photo" alt="">
          <!-- 下拉菜单 -->
          <el-dropdown trigger='click'>
              <span>{{ user.name }}</span>
              <el-dropdown-menu>
                <el-dropdown-item>账户信息</el-dropdown-item>
                <el-dropdown-item>git地址</el-dropdown-item>
                 <!-- 如果想要给一个组件注册一个原生  js事件
                      使用。native修饰符 -->
               <el-dropdown-item @click.native='onlogout'>退出</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>

      </el-col>
  </el-row>
</template>

<script>
import eventBus from '@/utils/event-bus'
export default {
  data () {
    return {
      user: {
        name: '',
        photo: ''
      }
    }
  },
  created () {
    this.loadUser()

    //
    eventBus.$on('update-user', user => {
      this.user = user
    })
  },
  methods: {
    onlogout () {
      this.$confirm('确认要退出吗?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //   确认删除执行这里
        // 删除token
        window.localStorage.removeItem('user-token')
        // 跳转到login页面
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '退出成功'
        })
      }).catch(() => {
        //   取消执行这里
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    },
    loadUser () {
      this.$axios({
        method: 'GET',
        url: '/user/profile'
      }).then(res => {
        this.user = res.data.data
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang='less' scoped>
.left{
    display: flex;
    align-items: center;
    i {
        font-size: 24px;
    }
    span {
        margin-left:4px;
    }

}
.right{
    display: flex;
    align-items: center;
    img{
        border-radius: 50%;
        margin-right: 5px;
    }

}
</style>
