<template>
  <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>卡片名称</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>

            <el-table
            :data="comments"
            style="width: 100%">
                <el-table-column
                    prop="date"
                    label="头像"
                    width="180">
                    <template slot-scope='scope'>
                        <img width="50" :src="scope.row.aut_photo">
                    </template>
                </el-table-column>
                <el-table-column
                    prop="content"
                    label="评论内容"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="点赞"
                    width='180'>
                    <template slot-scope="scope">
                       {{ scope.row.is_liking === 1?'已赞':'未赞' }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="like_count"
                    label="点赞数量">
                </el-table-column>
                <el-table-column
                    prop="pubdate"
                    label="评论日期">
                     <template slot-scope="scope">
                         <!-- 不传参 {{ scope.row.pubdate | dateFormat }}
                              传参   {{ scope.row.pubdate | dateFormat(参数) }}
                          -->
                       {{ scope.row.pubdate | dateFormat }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="reply_count"
                    label="回复数量">
                </el-table-column>
               <el-table-column
                    width="180"
                    label="是否推荐">
                    <template slot-scope="scope">
                     <el-switch
                        @change='onTop(scope.row)'
                        v-model="scope.row.is_top"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
  </div>
</template>

<script>
// import moment from 'moment'
export default {
  name: 'CommentList',
  // 除了这一中获取路由参数的形式 this.$route.params.articleId
  //   通过props解析，就是自动把路由参数映射到props中
  // 然后就可以像访问data一样访问
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      comments: []

    }
  },
  //   实力选项：过滤器
  // 全局 任何组件
  // 局部 只能在当前使用
  // 他的作用就是：常用语的一些简单的文本格式化  例如 日期格式化处理
  //  可以直接在模板中调用  调用方式
  // {{ 数据 | 过滤器 }}
  //   filters: {
  //     dateFormat (value) {
  //       return moment(value).format('YYYY-MM-DD')
  //     }
  //   },
  created () {
    this.loadComment()
  },
  methods: {
    loadComment () {
      this.$axios({
        method: 'GET',
        url: '/comments',
        params: {
          type: 'a', // 评论类型，a-对文章的评论 c-对文章的评论的回复
          source: this.$route.params.articleId// 文章id或者评论id
        }
      }).then(res => {
        console.log(res.data)

        // 这种方式想要再拿到原始的数据很困难
        this.comments = res.data.data.results
        // comments.forEach(item => {
        //   // moment(指定时间)  format(‘格式’)
        //   item.pubdate = moment(item.pubdate).format('YYYY-MM-DD HH:MM:ss')
        // })

        // 将处理之后的数据更新到组件中
        // this.comments = comments
        //
      }).catch(err => {
        console.log(err)
      })
    },
    onTop (comment) {
      this.$axios({
        method: 'PUT',
        url: `/comments/${comment.com_id}/sticky`, // sticky 是哦否置顶布尔值
        data: {
          // comment.is_top 双向绑定给了开关按钮
          // 所以获取 comment.is_top 就是砸获取开关的状态
          sticky: comment.is_top
        }
      }).then(res => {
        console.log(res)
        this.$message({
          type: 'success',
          message: '操作成功'
        })
      })
    }
  }
}
</script>

<style>

</style>
