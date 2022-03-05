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
    }, { //重置密码
        name: 'resetPssword',
        path: '/reset',
        component: () => import('../pages/resetPage/resetPage.vue')
    }, { //账户信息页
        path: '/PerChageUserMsg',
        component: () => import('../pages/personalChagePage/personalChagePage.vue')
    }, { //修改用户名页
        name: 'chageUserName',
        path: '/chageUserName',
        component: () => import('../pages/userMsgChage/userNameChage.vue')
    }, { //修改收货地址页
        name: 'receiveAdressChage',
        path: '/chageRecAddress',
        component: () => import('../pages/userMsgChage/receiveAdressChage.vue')
    }, { //新增地址页
        name: 'addNewAddress',
        path: '/addNewAddress',
        component: () => import('../pages/userMsgChage/addNewAddress/addNewAddress.vue')
    },{//搜索地址页
        name:'searchAddress',
        path:'/searchAddress',
        component:()=>import('../pages/userMsgChage/searchAddress/searchAddress.vue')
    }
]
}
const router = new VueRouter(routerOptions);

export default router;