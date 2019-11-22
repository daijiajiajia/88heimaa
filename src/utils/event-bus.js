import Vue from 'vue'

// 到处一个新建的两个用于通信的方法的
export default new Vue()

// 如何使用
/*
 vue实例有两个用于通信的方法
 发布订阅
 在通信的a端使用event-bus订阅一个自定义事件
 eventBus.$on('事件名称'，（）=》{
//    自定义逻辑代码
 })

 在通信的b端，根据你的业务发布调用自定义事件
 eventBus.$emit('事件名称'，如果有数据可以在这里放)

 b发布东西  a接收
*/
