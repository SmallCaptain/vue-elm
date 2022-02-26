// 路由配置
import VueRouter from 'vue-router';
import Vue from 'vue';
Vue.use(VueRouter);

const routerOptions = {
    mode:'history',
    routes: [{
        path:'/',
        redirect:'/home'
    },{
        path:'/home',
        component:()=>import('../components/Home.vue')
    }]
}
const router = new VueRouter(routerOptions);

export default router;