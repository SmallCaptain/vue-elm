<template>
  <div class="item">
      <div class="p" @click="addNewAddress(itemData)">
          <p>{{itemData.name}}</p>
          <p>{{itemData.address}}</p>
      </div>
  </div>
</template>

<script>
export default {
    name:'searchItem',
    props:{
        itemData:{
            type:Object
        }
    },
    methods:{
        addNewAddress(itemData){
            this.$store.dispatch('chageRecive/addNewAddress',itemData);
            // 从$store里取值看看是否成功了
            let newAddress= this.$store.state.chageRecive.newAddress;
            if (newAddress.length !== 0) {
                this.$router.go(-1);
            }else{
                this.$message({
                    message:'添加失败。。。请重试',
                    type:'error'
                });
            }
        }
    }
}
</script>

<style lang="less" scoped>
    div.item{
        & > div.p{
                padding: 15px 0;
                padding-left: 30px;
                border-bottom: 1px solid #969696 ;
            & > p{
                margin: 0;
                padding: 0;
                font-size: 30px;
                color: #969696;
                &:nth-child(1){
                    padding-bottom: 10px;
                }
            }
            
        }
    }
</style>