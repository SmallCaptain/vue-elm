const option = {
    namespaced:true,
    //业务处理层 可用异步操作
    actions:{
        // addShopping 往 购物车数据中 添加数据 为obj
        addShopping(content,data){
            content.commit('addShopping',data);
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
        }
    },
    //数据存储层
    state:{
        shoppingCart:[]
    },
    //派生层 指定函数 完成某些数据过滤
    getters:{

    }
}
export default option;