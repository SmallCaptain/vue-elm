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
                name: 'personal',
                path: 'personal',
                component: () => import('../pages/personalPage/personalPage.vue')
            }, { //外卖页
                name: 'takeout',
                path: 'takeout',
                component: () => import('../pages/TakeOut/TakeOut.vue')
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
        }, { //搜索地址页
            name: 'searchAddress',
            path: '/searchAddress',
            component: () => import('../pages/userMsgChage/searchAddress/searchAddress.vue')
        }, { //我的余额页
            name: 'UserWallect',
            path: '/UserWallect',
            component: () => import('../pages/UserWallect/UserWallect.vue')
        }, { //我的积分页
            name: 'UserPoint',
            path: '/UserPoint',
            component: () => import('../pages/UserPoint/UserPoint')
        }, //余额说明页
        {
            name: 'UserWallectInfo',
            path: '/UserWallectInfo',
            component: () => import('../pages/UserWallect/UserWallectInfo/UserWallectInfo.vue')
        }, //积分说明页
        {
            name: 'UserPointInfo',
            path: '/UserPointInfo',
            component: () => import('../pages/UserPoint/UserPointInfo/UserPointInfo.vue')
        }, //我的优惠页面
        {
            name: 'UserDiscounts',
            path: '/UserDiscounts',
            component: () => import('../pages/UserDiscounts/UserDiscounts.vue'),
            children: [{
                name: 'RedPacket',
                path: 'redPacket',
                component: () => import('../pages/UserDiscounts/RedPacket/RedPacket.vue')
            }]
        }
    ]
}

const router = new VueRouter(routerOptions);


export default router;