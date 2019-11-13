<template>
  <div class="login">
    <!-- elementui card卡片组件 -->
   <el-card class='login-card'>
     <!-- 卡片内容 -->
     <div class='title'>
       <img src="../../assets/img/logo_index.png" alt="">
     </div>
     <!-- 表单 -->
     <el-form style="margin-top:30px" :model='loginForm'>
       <!-- 一个表单与就是一个form-item -->
       <el-form-item prop="mobile">
         <!-- 放置表单组件  手机号 -->
         <!--  -->
         <el-input v-model="loginForm.mobile" placeholder='请输入您的手机号'></el-input>
       </el-form-item>
      <el-form-item prop="code">
          <!-- 验证码 和发送验证码 -->
          <el-input v-model="loginForm.code" style='width:240px' placeholder="请输入您的验证码"></el-input>
          <el-button style="float:right" plain>发送验证码</el-button>
        </el-form-item>
       <!-- 勾选协议框 -->
       <el-form-item prop='checked'>
         <el-checkbox v-model='loginForm.checked'>我已阅读并同意</el-checkbox>
       </el-form-item>
       <!-- 提交按钮 -->
       <el-form-item>
         <el-button style='width:100%' type='primary'>登录</el-button>
       </el-form-item>
     </el-form>
   </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
    //  要校验整个表单
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        checked: false // 是否勾选
      }
    }
  }
}
</script>

<style lang='less' scoped>
 .login{
   background-image: url('../../assets/img/login_bg.jpg');
  // cover 完全覆盖
  background-size: cover;
  height: 100vh; //满足整个屏幕的高度
  display: flex;
  justify-content: center;
  align-items: center;
    .login-card{
      width: 400px;
      height: 360px;
      .title{
        text-align: center;
        img{
          height: 45px;
        }
      }
    }
 }
</style>
