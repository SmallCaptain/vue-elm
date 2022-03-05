// 对user验证的vuex 全局公用
const option = {
    namespaced: true,
    //业务处理层 可用异步操作
    actions: {
        setUser(content,user) {
            content.commit('setUser',user);
        }
    },
    // 数据修改层 
    mutations: {
        setUser(state,user){
            state.user=user;
        }
    },
    //数据存储层
    state: {
        user: {
            username: '',
            isLogin: false,
            Token: null
        }
    },
    //派生层 指定函数 完成某些数据过滤
    getters: {

    },
}
export default option