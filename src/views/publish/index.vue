<template>
  <div class='publish'>
    <el-card  class="box-card">
      <div slot="header" class="clearfix">
        <span>发布文章</span>
      </div>

      <el-form ref="form" :model="article" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <!-- <el-input type="textarea" v-model="article.content"></el-input> -->
            <!-- bidirectional data binding（双向数据绑定） -->
          <quill-editor v-model="article.content"
                        ref="myQuillEditor"
                        :options="editorOption"
                       >
          </quill-editor>
        </el-form-item>
        <el-form-item label="频道">
          <!-- 下拉列表会把选中option的value值 同步到数据中 -->
          <el-select placeholder="请选择频道" v-model='article.channel_id'>
            <el-option
             :label="channel.name"
             :value='channel.id'
             v-for="channel in channels"
             :key="channel.id"
             ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="特殊资源">
                 <el-radio-group v-model="form.resource">
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                 </el-radio-group>
             </el-form-item> -->

        <el-form-item>
          <el-button type="primary" @click="onSubmit(false)">发表</el-button>
          <el-button  @click="onSubmit(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>

    </el-card>
  </div>
</template>

<script>
// 加载富文本编辑器的样式文件
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 加载富文本的核心组件
import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'Articlapublish',
  components: {
    quillEditor
  },
  data () {
    return {
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 0, // 无图
          images: [] // 无图就是空数组
        },
        channel_id: '' // id
      },
      channels: [],
      editorOption: {} // 富文本编辑器的配置选项
    }
  },
  methods: {
    onSubmit (draft) {
      this.$axios({
        method: 'POST',
        url: '/articles',
        // headers: {
        //   Authorization: `Bearer ${window.localStorage.getItem('user-token')}`
        // },
        params: {
          draft
        },
        data: this.article
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err, '保存失败')
      })
    },
    loadChannels () {
      // 有些接口需要token有些接口不需要token 根据情况
      this.$axios({
        method: 'GET',
        url: '/channels'
      }).then(res => {
        // console.log(res)
        this.channels = res.data.data.channels
      }).catch(err => {
        console.log(err, '获取失败')
      })
    }
  },
  created () {
    this.loadChannels()
  }

}
</script>

<style>

</style>
