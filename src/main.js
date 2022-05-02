import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import NutUI from '@nutui/nutui';
import '@nutui/nutui/dist/nutui.css';


import Toast from 'components/common/toast'

// 用于解决移动端点击延迟300ms的问题
import FastClick from 'fastclick'
// 图片懒加载
import VueLazyLoad from 'vue-lazyload'
// 阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false
// 初始化 EventBus 事件总线
Vue.prototype.$bus = new Vue()
// 每个Vue实例的原型对象上都有$emit和$on

NutUI.install(Vue);

// 安装Toast插件 会去执行toast里面的index.js的install函数
Vue.use(Toast)

// 解决移动端300ms延迟
FastClick.attach(document.body)

// 使用懒加载插件
Vue.use(VueLazyLoad,{
  // loading:require('./assets/img/common/placeholder.png')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
