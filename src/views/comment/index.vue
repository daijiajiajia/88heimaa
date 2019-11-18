<template>
  <div>
      <el-card class='box-card'>
            <div slot='header' class='clearfix'>
              <span>评论列表</span>
            </div>

            <el-table
                :data="article"
                style="width: 100%">
                    <el-table-column
                        prop="title"
                        label="标题"
                        width="300">
                    </el-table-column>

                    <el-table-column
                        prop="total_comment_count"
                        label="总评论数">
                    </el-table-column>
                        <el-table-column
                        prop="fans_comment_count"
                        label="粉丝评论数">
                    </el-table-column>

                    <el-table-column
                        label="评论状态"
                        width="180">
                        <template slot-scope='scope'>
                            <el-switch
                                v-model="scope.row.comment_status"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                @change='onStatuschange(scope.row)'
                                >
                            </el-switch>
                        </template>
                    </el-table-column>

                    <el-table-column
                        label="操作">
                        <template>
                            <el-button type='primary'>修改</el-button>
                        </template>
                    </el-table-column>
            </el-table>
      </el-card>
  </div>
</template>

<script>
export default {
  name: 'CommentIndex',
  data () {
    return {
      article: [] // 文章评论
    }
  },
  methods: {
    loadArticless () {
      this.$axios({
        method: 'GET',
        url: '/articles',
        params: {
          response_type: 'comment'
        }
      }).then(res => {
        console.log(res)
        this.article = res.data.data.results
      }).catch(err => {
        console.log(err)
      })
    },
    onStatuschange (article) {
      this.$axios({
        method: 'PUT',
        url: '/comments/status',
        params: {
          article_id: article.id.toString() // 原型是bignumber需要转
        },
        data: {
          // 开关组件双向绑定了article.comment_status
        //   所以获取 article.comment_status 也就是在获取开关组件的启用状态
          allow_comment: article.comment_status
        }
      }).then(res => {
        console.log(res)
        this.$message({
          type: 'success',
          message: `${article.comment_status ? '启用' : '关闭'}成功`
        })
      }).catch((err) => {
        console.log(err)
        this.$message.error('操作失败')
      })
    }
  },
  created () {
    this.loadArticless()
  }

}
</script>

<style>

</style>
