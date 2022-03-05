// 用于更改收货地址的共用存储库
const option = {
    namespaced: true,
    //业务处理层 可用异步操作
    actions: {
        setNowPosistion(context, data) {
            context.commit('setNowPosistion', data);
        },
        addNewAddress(context, data) {
            context.commit('addNewAddress', data);
        },
        pushAddress(context, data) {
            context.commit('pushAddress', data);
        },
        delAddress(context, data) {
            context.commit('delAddress', data);
        }
    },
    // 数据修改层 
    mutations: {
        setNowPosistion(state, data) {
            state.nowPosistion.area = data.name;
            state.nowPosistion.areaId = data.id;
        },
        addNewAddress(state, data) {
            state.newAddress = data;
        },
        pushAddress(state, data) {
            //检查一下数据中和data数据中有无重复的问题 有重复就不推入了
            // 对象数据。。
           state.address=data;
        },
        // delAddress(state,data){
        //     state.address = state.address.filter((item)=>{
        //         return item.
        //     })
        // }

    },
    //数据存储层
    state: {
        // 当前定位数据
        nowPosistion: {
            area: '',
            areaId: 0
        },
        //目前已设置的收货地址等相关信息数组 
        address: [],
        // 新增的一个收货地址等相关信息
        newAddress: {}
    },
    //派生层 指定函数 完成某些数据过滤
    getters: {

    }
}
export default option;