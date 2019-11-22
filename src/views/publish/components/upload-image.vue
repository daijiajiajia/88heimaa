<template>
  <div>
    <el-col :span='4'>
      <div
        @click="onUploadshow"
        class="avatar-uploader"
        >
        <img v-if="value" :src="value" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
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
              <el-col :class="{
                'img-item':index === activeIndex
              }"
               @click.native="activeIndex = index"
               :span="6" v-for='(item,index) in images' :key='item.id'>
                <img height='100' :src="item.url">
              </el-col>
            </el-row>
        </el-tab-pane>

        <el-tab-pane label="上传图片" name="second">
            <el-upload
              action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
              list-type="picture-card"
              :headers='uploadHeaders'
              name='image'
              :on-preview="onPreview"
             >
              <i class="el-icon-plus"></i>
            </el-upload>
        </el-tab-pane>

      </el-tabs>

      <!-- <span>需要注意的是内容是默认不居中的</span> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'uploadImages',
  data () {
    const token = window.localStorage.getItem('user-token')
    return {
      centerDialogVisible: false,
      activeName: 'first', // 激活标签页
      activeType: 'all', // 激活的类型
      images: [],
      activeIndex: null, // 激活图片索引
      // previewImage: '', // 预览的图片地址
      uploadHeaders: {
        Authorization: `Bearer ${token}`
      },
      previewImage: '' // 存储选中的上传图片的路径
    }
  },
  props: {
    value: {
      type: String
    }
  },
  methods: {

    onUploadshow () {
      // 请求加载数据
      this.loadImages()

      // 显示弹框
      this.centerDialogVisible = true
    },
    loadImages () { // 全部和收藏的图片获取
      this.$axios({
        method: 'GET',
        url: '/user/images',
        params: {
          //  this.activeType  z双向绑定了radio
          collect: this.activeType === 'collect' // 是否获取收藏图片
        }
      }).then(res => {
        // console.log(res)
        this.images = res.data.data.results
      }).catch(err => {
        console.log(err)
      })
    },
    onConfirm () { // 当对话框点击确定的时候
      if (this.activeName === 'first') {
        const image = this.images[this.activeIndex]
        if (image) {
        // 将图片选中的路径赋值给 previewImage
        // this.previewImage=image.url

          // 将所选图片的路径同步给父组件绑定的数据
          this.$emit('input', image.url)
        }
      } else if (this.activeName === 'second') {
        const previewImage = this.previewImage
        if (previewImage) {
          // 将所选图片的路径同步给父组件绑定的数据
          this.$emit('input', previewImage)
        }
      }

      // 关闭对话框
      this.centerDialogVisible = false
    },
    onPreview (file) {
      // console.log(file)
      // 上传图片需要点击图片表面的+才会把地址给他
      this.previewImage = file.response.data.url
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
.img-item {
  border:1px solid #000;
}
</style>
