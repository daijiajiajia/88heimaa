<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>素材管理</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
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
                }"></i>
             <!--   class 本来就是绑定数据字符串
                <i :class="iteme.is_collected?el-icon-star-on:el-icon-star-on"></i> -->
             <i class="el-icon-delete-solid"></i>
            </div>
          </el-card>
       </el-col>

      </el-row>
   </el-card>
  </div>
</template>

<script>
export default {
  name: 'MeidaImage',
  data () {
    return {
      images: [],
      type: '全部'
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
