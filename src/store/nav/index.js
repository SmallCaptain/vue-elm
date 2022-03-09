const option = {
    namespaced:true,
    //业务处理层 可用异步操作
    actions:{
        setRouteName(content,data){
            content.commit('setRouteName',data);
        }
    },
    // 数据修改层 
    mutations:{
        setRouteName(state,data){
            state.routeName=data;
        }
    },
    //数据存储层
    state:{
        routeName:'personal'
    },
    //派生层 指定函数 完成某些数据过滤
    getters:{

    }
}
export default option;