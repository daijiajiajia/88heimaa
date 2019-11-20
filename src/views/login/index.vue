<template>
  <div class="login">
    <!-- elementui card卡片组件 -->
   <el-card class='login-card'>
     <!-- 卡片内容 -->
     <div class='title'>
       <img src="../../assets/img/logo_index.png" alt="">
     </div>
     <!-- 表单 -->
     <!-- model 属性 要绑定的表单数据对象 rules标示绑定校验规则对象 ref 属性(属性名无所谓主要是获取...) -->
     <el-form ref='formObj' style="margin-top:30px" :model='loginForm' :rules='loginRules'>
       <!-- 一个表单与就是一个form-item  prop接收校验数据的字段名 通过获取model值-->
       <el-form-item prop="mobile">
         <!-- 放置表单组件  手机号 -->
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
         <el-button style='width:100%' type='primary' @click='login'>登录</el-button>
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
      },
      // 校验规则对象  prop值
      loginRules: {
      //  key（要校验的字段名）：value（数组=>多条或者一条或者没有规则 =》在这种情况下校验）
        //  require:不填无法通过校验 写true就表示该字段必填
        //  message 当不满足设置规则时的提示信息 对象1. 输入为空的时 对象2.输入内容不正确
        //  pattern 正则表达式
        mobile: [{ required: true, message: '请输入您的手机号' }, {
          pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号'
        }],
        code: [{ required: true, message: '请输入验证码' },
          {
            pattern: /^\d{6}$/, message: '请输入正确验证码'
          }
        ],
        // required 只能校验null undefined 和空字符串 不能校验布尔值所以采取另一种方式校验
        // validator 自定义校验函数
        checked: [{ validator: function (rule, value, callback) {
          // rule 代表当前规则
          // value代表当前的值 =》表单字段checked的值
          // callback 代表回电函数
          if (value) {
            // 如果是true 就是选中了 通过校验
            callback() // 直接执行callback表示通过
          } else {
            // 如果没有选中 不通过校验 返回一个错误信息
            // 为什么是new Error 因为它期望传递一个error实例数组以指示验证失败(网上查的)
            callback(new Error('您需要勾选协议'))
          }
        } }]
      }
    }
  },
  // 手动验证所有数据
  methods: {
    login () {
      // console.log(11111)
      // this.$refs.formObj  获取el-form 的对象实例（组件）
      // ref 可以获取两个 ：1.获取dom对象 2.获取组件(也就是this，子组件实例本身) 获取this之后就可以调用他的东西比如data，methods
      // console.log(this.$refs.formObj)  得到的是 全局实例-》严格来说组件就是一个特殊的vue实例； 在这里ref获取的是的组件 validate是组件的一个方法
      this.$refs.formObj.validate((isok) => {
        if (isok) {
          // 如果是true就继续 调用接口 调用借口 首先确定有没有引入
          // console.log('校验成功！')
          this.$axios({
            url: '/authorizations',
            data: this.loginForm,
            method: 'post'
            // 正确信息是.then（）
          }).then(result => {
            // 返回值 给一个身份牌 存储到本地
            console.log(result) // 可以获取到token result.data.data.token
            //  存到本地存储
            window.localStorage.setItem('user-token', result.data.data.token)
            // 跳转到主页
            this.$router.push('/')
          }).catch(() => {
            // 错误信息就用catch接收
          //  提示信息 this.$message 是ele-ui已经安装在全局了所以可以直接使用 详情参照ele-ui
            this.$message({
              type: 'warning',
              message: '手机号或者验证码错误'
            })
          })
        }
      })
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
