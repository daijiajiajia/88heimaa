<template>
  <div class='channel-select'>
      <!-- element 的下拉列表组件
           这个组件要求v-model绑数据
           :value='value' 前者是组件的属性 后者是props数据

           element 的select组件的切换选项的时候会触发一个名字叫做input的自定义事件，该事件可以获得一个毁掉函数，选中的option的value

           所以我们就手动监听这个事件，事件触发的时候，使用$emit给富组件发出一个通知，让组件修改绑定的数据channel_id

             @input='onInput'   oninput可以替换成$emit('input',$event)
       -->
    <el-select
    placeholder="请选择频道"
    :value='value'
    @input='onInput'>
        <el-option
        :label="channel.name"
        :value='channel.id'
        v-for="channel in channels"
        :key="channel.id"
        ></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'ChannelSelect',
  data () {
    return {
      channels: []
    }
  },
  props: {
    value: {
      type: [String, Number],
      require: true
    }
  },
  methods: {
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
    onInput (data) {
      this.$emit('input', data)
    }
  },
  created () {
    this.loadChannels()
  }
}
</script>

<style>

</style>
