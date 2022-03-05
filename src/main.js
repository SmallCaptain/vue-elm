import Vue from 'vue'
import App from './App.vue'
import axios from './axios/index'
import axiosP from './axios/position.js'
// 引入elementui 样式
import 'element-ui/lib/theme-chalk/index.css';
// 引入Message 组件 挂载
import { Message } from 'element-ui';
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
Vue.prototype.$message=Message;
Vue.config.productionTip = false;
Vue.prototype.$axios=axios;
Vue.prototype.$axiosP=axiosP;

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
