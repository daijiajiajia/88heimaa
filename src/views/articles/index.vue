<template>
<div>
  <!-- 筛选数据 -->
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>全部图文</span>
    </div>
    <el-form ref='form' label-width="100px" >
        <el-form-item label="文章状态">
                   <!-- 单选框组会把选中的radio的label同步给绑定的数据 -->
              <el-radio-group v-model='filterForm.status'>
                <!-- 借口要求不传是全部  不能直接写null不然就会使字符串-->
                <el-radio :label="null">全部</el-radio>
                <el-radio label="0">草稿</el-radio>
                <el-radio label="1">待审核</el-radio>
                <el-radio label="2">审核成功</el-radio>
                <el-radio label="3">审核失败</el-radio>
                <el-radio label="4">已删除</el-radio>
              </el-radio-group>

        </el-form-item>
        <el-form-item label="频道列表">
          <!-- 下拉列表会把选中option的value值 同步到数据中 -->
          <el-select placeholder="请选择频道" v-model='filterForm.channel_id'>
            <!-- 手动增加一个option 加上所有 -->
            <el-option label='所有频道' :value='null'></el-option>
            <el-option
             :label="channel.name"
             :value='channel.id'
             v-for="channel in channels"
             :key="channel.id"
             ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择" required>
            <el-date-picker
              v-model="rangeDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format='yyyy-MM-dd'>
            </el-date-picker>
       </el-form-item>
       <el-form-item>
          <el-button type="primary" @click='loadArticles(1)'>查询</el-button>
       </el-form-item>
    </el-form>

  </el-card>
  <!-- 筛选数据 -->

  <!-- 文章列表 -->
  <el-card>
    <div slot="header" class="clearfix">
      <span>
        共找到{{totalcount}}条符合条件的内容
      </span>
    </div>
     <template>
    <el-table
      v-loading='loading'
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
        <template slot-scope='scope'>
          <el-button type="primary">编辑</el-button>
          <el-button type="info" @click='ondelete(scope.row.id)'>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </template>
  </el-card>
  <!-- 文章列表 -->

  <!-- 分页
    分页组件默认按照10条每页划分页码 整个数据的页码 向上取整
    total 用来指定一共有多少数据
     layout="prev, pager, next" 上一页 页码 下一页
     用户可能会随意乱点 可以设置一个禁用状态
  -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalcount"
         @current-change="onPageChange"
         :disabled='loading'
        >
    </el-pagination>
  <!-- 分页 -->
</div>
</template>

<script>
export default {
  name: 'articlesload',
  data () {
    return {
      //  过滤数据的表单
      filterForm: {
        status: null, // 不能是空字符串
        channel_id: null // null为不传
        // begin_pubdate: '',
        // end_pubdate: ''
      },
      rangeDate: [], // 日期 空字符串发会报错 定义一个空数组 数组是空的绑定元素0：undefined 也可以
      formData: [], // 文章数据列表
      loading: true, // 表格的loading状态
      articlesStatus: [
        {
          type: '',
          label: '草稿'
        },
        {
          type: 'warning',
          label: '待审核'
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
          type: 'info',
          label: '已删除'
        }

      ],
      totalcount: 0, // 总记录数
      channels: [], // 频道列表
      page: 1 // 当前页码
    }
  },
  methods: {
    loadArticles (page = 1) {
      // 加载loading
      this.loading = true

      // 在我们的项目中，除了/login 接口不需要token，
      // 其他所有的接口都需要提供token才能请求
      // 否则返回401错误
      // 我们这里的后端要求把token 放到请求头中
      // const token = window.localStorage.getItem('user-token')

      // 调用接口
      this.$axios({
        url: '/articles',
        method: 'GET',
        // headers: {
        //   //  添加请求头
        //   // 名字：值
        //   // 后端要求把token放到请求头中 使用一个名字叫做Authorization
        //   // 注意token 的格式要求：Bear用户token
        //   // 注意Bearer 有个空格，多了少了都不行
        //   Authorization: `Bearer ${token}`
        // },
        // query参数适用params传递
        params: {
          page, // 页码
          // axios有个功能当参数值W为null时 就不会发送了
          status: this.filterForm.status, // 文章状态
          channel_id: this.filterForm.channel_id, // 频道id,不穿就是所有
          begin_pubdate: this.rangeDate[0] ? this.rangeDate[0] : null, // 开始时间
          end_pubdate: this.rangeDate[1] ? this.rangeDate[1] : null, // 结束时间
          per_page: 10// 每页大小  后端默认10条每页
        }
      }).then((res) => {
        // 成功走这
        // console.log(res)
        // 更新文章列表数组
        this.formData = res.data.data.results
        // 更新总记录数
        this.totalcount = res.data.data.total_count
      }).catch((res) => {
        // 失败走这
        console.log(res, '失败')
      }).finally(() => {
        // 无论成功还是失败都要执行
        this.loading = false
      })
    },
    onPageChange (page) {
      this.page = page // 记录页码
      // console.log(page)
      // 请求指定页码的文章列表
      this.loadArticles(page)
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
    },
    ondelete (articleId) {
      this.$axios({
        method: 'DELETE',
        // /articles/:target
        // 注意：接口路径中的 :target 是一个路径参数 :target是动态的。例如 1 2 3不要写：
        url: `/articles/${articleId}` // 任何数据和字符串相加都会自动tostring 这里的拼接相当于相加
        // headers: {
        //   // 接口中说明的content-type ...不需要传递  axios会自动添加发送
        //   Authorization: `Bearer ${window.localStorage.getItem('user-token')}`
        // }

      }).then(res => {
        this.loadArticles(this.page)
      }).catch(err => {
        console.log(err, '删除失败')
      })
    }
  },
  created () {
    // 获取文章列表 es6语法  不传默认是1 传递了就是传递了的
    this.loadArticles(1)
    // 获取频道列表
    this.loadChannels()
  }
}
</script>

<style scoped>

</style>
