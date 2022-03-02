// 路由配置
import VueRouter from 'vue-router';
import Vue from 'vue';
Vue.use(VueRouter);

const routerOptions = {
    mode: 'history',
    routes: [{
            path: '/',
            redirect: '/home/personal'
        }, {
            //首页 也是个人信息页
            path: '/home',
            component: () => import('../components/Home.vue'),
            children: [{
                path: 'personal',
                component: () => import('../pages/personalPage/personalPage.vue')
            }]
        }, {
            //登录
            name: 'login',
            path: '/login',
            component: () => import('../pages/loginPage/loginPage.vue')
        },
        { //重置密码
            name: 'resetPssword',
            path: '/reset',
            component: () => import('../pages/resetPage/resetPage.vue')
        }, { //账户信息页
            path:'/PerChageUserMsg',
            component:()=> import('../pages/personalChagePage/personalChagePage.vue')
        }
    ]
}
const router = new VueRouter(routerOptions);

export default router;