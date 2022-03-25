<template>
    <el-container id="GoodsCategory">
        <el-header>
            <Header :fucName="funcName" />
            <!-- 筛选组件 -->
            <div class="types">
                <FilterTypes :funcName="funcName" />
            </div>
        </el-header>
        <el-main>

        </el-main>
    </el-container>
</template>

<script>
import Header from '../../components/Header.vue';
import FilterTypes from './FilterTypes.vue';

export default {
  components: { Header,FilterTypes },
  name:'GoodsCategory',
  props:{
      funcName:{
          type:String,
          default(){
              return '默认名称'
          }
      }
  }
}
</script>

<style lang="less" scoped>
    #GoodsCategory{
        & > .el-header{
            position: absolute;
            width: 100vw;
            top: 0;
            padding: 0;
            height: auto !important;
        }
        & > .el-main{
            padding: 0;
        }

    }    
</style>