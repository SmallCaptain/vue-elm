const option = {
    namespaced:true,
    //业务处理层 可用异步操作
    actions:{
        // addShopping 往 购物车数据中 添加数据 为obj
        addShopping(content,data){
            content.commit('addShopping',data);
        },
        // 改变收货地址
        chageAddress(content,data){
            content.commit('chageAddress',data);
        },
        //改变本轮订单的商家id 代表本轮订单是哪一家商家
        chageStoreId(content,data){
            content.commit('chageStoreId',data)
        },
        //修改order详情数据
        chageOrderDetail(content,data){
            content.commit('chageOrderDetail',data)
        }
    },
    // 数据修改层 
    mutations:{
        addShopping(state,data){
            let index = -1;
            let shoppingCart = state.shoppingCart;
            for(let i = 0 ;i < shoppingCart.length;i++){
                if(shoppingCart[i].storeId === data.storeId ){
                    //存在相同商家的购物车数据
                    index = i;
                }
            }
            if(index !== -1){
                state.shoppingCart[index] = data;
            }else{
                state.shoppingCart.push(data);
            }
        },
        chageAddress(state,data){
            state.address = data;
        },
        chageStoreId(state,data){
            //赋予商家id
            state.storeId = data
            //根据商家id 从购物车挑选出数据
            let order = [];
            for(let obj of state.shoppingCart){
                if (obj.storeId === data) {
                    order = obj;
                    break;
                }
            }
            state.order = order;
        },
        chageOrderDetail(state,data){
           state.order_detail = data;
        }
    },
    //数据存储层
    state:{
        shoppingCart:[],
        address:{},
        storeId:'defalut',
        order:[],//本次订单的商品
        order_detail:{}//查看详情的商品信息
    },
    //派生层 指定函数 完成某些数据过滤
    getters:{

    }
}
export default option;