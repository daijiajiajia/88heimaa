<template>
  <div>
    <el-col :span='4'>
      <div
        @click="onUploadshow"
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else  @click="centerDialogVisible = true" class="el-icon-plus avatar-uploader-icon"></i>
      </div>
    </el-col>
    <!-- <p>上传</p> -->
    <!-- <el-button type="text" @click="centerDialogVisible = true">图片上传</el-button> -->

    <el-dialog
      title="请选择文章封面图片"
      :visible.sync="centerDialogVisible"
      width="50%"
      center>

      <el-tabs v-model="activeName" >
        <el-tab-pane label="素材库" name="first">
          <!-- 标签内容 -->
            <el-radio-group v-model="activeType" @change='loadImages'>
              <el-radio label="all">全部</el-radio>
              <el-radio label="collect">收藏</el-radio>
            </el-radio-group>
            <el-row :gutter="20">
              <el-col :span="6" v-for='item in images' :key='item'>
                <img height='100' :src="item.url">
              </el-col>
            </el-row>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="second">上传图片</el-tab-pane>
      </el-tabs>

      <!-- <span>需要注意的是内容是默认不居中的</span> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'uploadImages',
  data () {
    return {
      centerDialogVisible: false,
      activeName: 'first', // 激活标签页
      activeType: 'all', // 激活的类型
      images: []
    }
  },
  methods: {

    onUploadshow () {
      // 请求加载数据
      this.loadImages()

      // 显示弹框
      this.centerDialogVisible = true
    },
    loadImages (isCollect = false) {
      this.$axios({
        method: 'GET',
        url: '/user/images',
        params: {
          //  this.activeType  z双向绑定了radio
          collect: this.activeType === 'collect' // 是否获取收藏图片
        }
      }).then(res => {
        console.log(res)
        this.images = res.data.data.results
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created () {},
  mounted () {}
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px solid red;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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
