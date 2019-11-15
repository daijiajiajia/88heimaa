<template>
<div>
  <!-- 筛选数据 -->
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>全部图文</span>
    </div>
    <el-form ref='form' label-width="100px" >
        <el-form-item label="文章状态">

              <el-radio-group v-model='filterForm.status'>
                <el-radio label="全部"></el-radio>
                <el-radio label="草稿"></el-radio>
                <el-radio label="待审核"></el-radio>
                <el-radio label="审核成功"></el-radio>
                <el-radio label="审核失败"></el-radio>
              </el-radio-group>

        </el-form-item>
        <el-form-item label="频道列表">
          <el-select placeholder="请选择活动区域" v-model='filterForm.channel_id'>
            <el-option label="区域一" value='shangah' ></el-option>
            <el-option label="区域二" value='beijing'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择" required>
            <el-date-picker
              v-model="rangeDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
       </el-form-item>
    </el-form>

  </el-card>
  <!-- 筛选数据 -->

  <!-- 文章列表 -->
  <el-card>
    <div slot="header" class="clearfix">
      <span>
        共找到59943条符合条件的内容
      </span>
    </div>
     <template>
    <el-table
      :data="formData"
      style="width: 100%">
      <el-table-column
        prop="img"
        label="封面"
        width="180">
        <!--
             自定义表格列
             在template上声明  slot-scope='scope',然后就可以通过scope.row获取遍历的当前项
             scope.row就相当于v-for 的item
             注意：只有当你需要在自定义表格列模板中访问遍历项是才这么做

         -->
         <template slot-scope='scope'>
           <img width='50' :src="scope.row.cover.images[0]" alt="">
         </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
        <template slot-scope='scope'>
          <el-tag :type='articlesStatus[scope.row.status].type'>{{ articlesStatus[scope.row.status].label }}</el-tag>
        </template>
      </el-table-column>
        <el-table-column
        prop="pubdate"
        label="发布日期">
      </el-table-column>
        <el-table-column
        prop="address"
        label="操作">
        <template>
          <el-button type="primary">编辑</el-button>
          <el-button type="info">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </template>
  </el-card>
  <!-- 文章列表 -->
</div>
</template>

<script>
export default {
  name: 'article',
  data () {
    return {
      //  过滤数据的表单
      filterForm: {
        status: '',
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: ''
      },
      rangeDate: '',
      formData: [],
      articlesStatus: [
        {
          type: '',
          label: '全部'
        },
        {
          type: 'info',
          label: '草稿'
        },
        {
          type: 'success',
          label: '审核成功'
        },
        {
          type: 'danger',
          label: '审核失败'
        },

        {
          type: 'warning',
          label: '待审核'
        }

      ]
    }
  },
  methods: {
    loadArticles () {
      // 在我们的项目中，除了/login 接口不需要token，
      // 其他所有的接口都需要提供token才能请求
      // 否则返回401错误
      // 我们这里的后端要求把token 放到请求头中
      const token = window.localStorage.getItem('user-token')

      // 调用接口
      this.$axios({
        url: '/articles',
        method: 'GET',
        headers: {
          //  添加请求头
          // 名字：值
          // 后端要求把token放到请求头中 使用一个名字叫做Authorization
          // 注意token 的格式要求：Bear用户token
          // 注意Bearer 有个空格，多了少了都不行
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        // 成功走这
        console.log(res)
        this.formData = res.data.data.results
      }).catch((res) => {
        // 失败走这
        console.log(res, '失败')
      })
    }
  },
  created () {
    this.loadArticles()
  }
}
</script>

<style scoped>

</style>
