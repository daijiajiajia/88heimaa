<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>素材管理</span>
       <!--
         action  上传文件的地址
         on-preview 上传预览时间
         on-remove 删除事件
         这个上传组件能帮我们自动发送请求  只需要把相关的配置出来
         上传组件自己内部自己发请求   不是axios  不需要基础路径
          手动配置请求头
        -->
        <el-upload
        show-file-list='false'
        :on-success='onUploadSuccess'
          name='image'
          :headers='uploadheaders'
          style="float: right; padding: 3px 0"
          class="upload-demo"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
           >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>

      </div>

      <div>
        <el-radio-group v-model="type" @change='onFind'>
          <el-radio-button label="全部">全部</el-radio-button>
          <el-radio-button label="收藏">收藏</el-radio-button>
        </el-radio-group>
      </div>
       <!--
         el-row 行
         gutter 间隔距离
         el-col 列
         span 用来指定列数
        -->
      <el-row :gutter="20">
       <el-col
       :xs="24"
        :sm="12"
         :md="4"
        v-for='item in images'
        :key='item.id'

        class='col-item'
         >
          <el-card :body-style="{ padding: '0px' }">
            <img
            :src="item.url"
            class="image"
            height='200'
            >
            <div style="padding: 14px;" class='action'>
              <!-- class还支持对象语法 -->
              <i :class="{
                'el-icon-star-on': item.is_collected,
                'el-icon-star-off': !item.is_collected,
                }"
                @click='onCollect(item)'
                ></i>
             <!--   class 本来就是绑定数据字符串
                <i :class="iteme.is_collected?el-icon-star-on:el-icon-star-on"></i> -->
             <i class="el-icon-delete-solid"
              @click="onDelete(item)"
             ></i>
            </div>
          </el-card>
       </el-col>

      </el-row>
   </el-card>
  </div>
</template>

<script>
const token = window.localStorage.getItem('user-token')

export default {
  name: 'MeidaImage',
  data () {
    return {
      images: [],
      type: '全部',
      uploadheaders: {
        Authorization: `Bearer ${token}`
      }
    }
  },
  created () {
    this.loadImages()
  },
  methods: {
    loadImages (isCollect = false) {
      this.$axios({
        method: 'GET',
        url: '/user/images',
        params: {
          collect: isCollect // 是否获取收藏图片
        }
      }).then(res => {
        console.log(res)
        this.images = res.data.data.results
      }).catch(err => {
        console.log(err)
      })
    },
    // z这个函数是radio的change的事件处理函数
    // 通过文档我们得知，事件函数有个回调函数：选中 radio 的label值会
    // 所以我们可以声明一个形参来接收使用
    onFind (value) {
      this.loadImages(value !== '全部')
    },
    // 收藏和取消
    onCollect (item) {
      this.$axios({
        method: 'PUT',
        url: `/user/images/${item.id}`,
        data: {
          collect: !item.is_collected
        }
      }).then(res => {
        this.$message({
          type: 'success',
          message: '操作成功'
        })

        item.is_collected = !item.is_collected
      }).catch(err => {
        console.log(err)
      })
    },
    // 删除
    onDelete (item) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确定执行
        this.$axios({
          method: 'DELETE',
          url: `/user/images/${item.id}`
        }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.loadImages(this.type !== '全部')
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {
        // 取消执行
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // upload组件上传成功触发的事件
    onUploadSuccess () {
      this.loadImages(this.type !== '全部')
    }
  }
}
</script>

<style lang='less' scoped>
.col-item{
     margin-bottom:20px;
       .action{
             display: flex;
             justify-content: space-around;
             font-size: 24px;
       }
}
</style>
