import Vue from 'vue'
import App from './App.vue'
// 引入elementui 样式
import 'element-ui/lib/theme-chalk/index.css';
// 从elementUi文件夹读取配置
import elementUi from './elementUi';
// 使用自定义的elementui配置  为了按需导入
Vue.use(elementUi);
// 读取路由配置
import router from './router'
// 读取vuex store配置
import store from './store'
// 全局样式的引入
import '../public/index.css';
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
