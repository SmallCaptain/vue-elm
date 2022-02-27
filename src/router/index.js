// 路由配置
import VueRouter from 'vue-router';
import Vue from 'vue';
Vue.use(VueRouter);

const routerOptions = {
    mode:'history',
    routes: [{
        path:'/',
        redirect:'/home/personal'
    },{
        path:'/home',
        component:()=>import('../components/Home.vue'),
        children:[
            {
                path:'personal',
                component:()=>import('../pages/personalPage/personalPage.vue')
            }
        ]
    },{ name:'login',
        path:'/login',
        component:()=>import('../pages/loginPage/loginPage.vue')
    }]
}
const router = new VueRouter(routerOptions);

export default router;