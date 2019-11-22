<template>
  <div>
      <el-row>
        <el-col :span='10'>
            <el-form ref="form" :model="user" label-width="80px">

                  <el-form-item label="用户昵称">
                    <el-input v-model="user.name"></el-input>
                  </el-form-item>
                  <el-form-item label="个人介绍">
                    <el-input v-model="user.intro"></el-input>
                  </el-form-item>
                  <el-form-item label="手机号码">
                    <el-input disabled v-model="user.mobile"></el-input>
                  </el-form-item>
                  <el-form-item label="用户邮箱">
                    <el-input v-model="user.email"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit">保存修改</el-button>
                  </el-form-item>
            </el-form>
        </el-col>
        <el-col :offset="1" :span="5">
                <!--
                  要么自己上传 要么就用组件的
                  但是发现两个请求 一个是post  我们的是patch  不支持自定义请求方法

                  覆盖默认的上传行为，可以自定义上传的实现   http-request
                 -->
            <el-upload
              :http-request='onUpload'
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
            >
              <img v-if='user.photo' :src='user.photo' width="100" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <p>点击上传用户头像</p>
            </el-upload>

        </el-col>
      </el-row>
  </div>
</template>

<script>
import eventBus from '@/utils/event-bus'
export default {
  data () {
    return {
      user: {
        email: '', // 邮箱
        intro: '', // 简介
        mobile: '', // 手机号
        name: '', // 昵称
        photo: '' // 头像
      }
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    onSubmit () { // 点击提交账户信息
      // console.log('submit!')
      // const { name,eamil,intro}=this.user   解构
      this.$axios({
        method: 'PATCH',
        url: '/user/profile',
        data: this.user
      }).then(res => {
        // 更新用户信息之后，通知头部组件
        eventBus.$emit('update-user', this.user)
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      }).catch(err => {
        console.log(err)
      })
    },
    loadUserProfile () { // 加载用户信息
      this.$axios({
        method: 'GET',
        url: '/user/profile'
      }).then(res => {
        // console.log(res.data)
        this.user = res.data.data
      }).catch(err => {
        console.log(err)
      })
    },
    onUpload (config) { // 覆盖上传行为
    //  经过测试 我们可以接受到一个上传相关的参数
      const fd = new FormData()
      fd.append('photo', config.file)
      this.$axios({
        method: 'PATCH',
        url: '/user/photo',
        data: fd
      }).then(res => {
        this.user.photo = res.data.data.photo

        // 更新用户信息之后，通知头部组件
        eventBus.$emit('update-user', this.user)
      }).catch(() => {
        this.$message.error('上传失败')
      })
    }
  }
}
</script>

<style scoped>
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
