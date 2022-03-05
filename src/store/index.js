import Vue from 'vue';
import Vuex from 'vuex';
import user from './user/user.js';
import chageRecive from './chageRecive/chageRecive.js'
import createPersistedState from 'vuex-persistedstate' //在此引入
Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        user,
        chageRecive
    },
    plugins: [createPersistedState({
        // 默认存储在localStorage 现改为sessionStorage
        storage: window.sessionStorage,
        // 本地存储数据的键名
        key: 'mine'
    })] //添加此行
});

export default store