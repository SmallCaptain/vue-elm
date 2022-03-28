<template>
  <el-container id="GoodsCategory">
    <el-header>
      <Header :fucName="funcName" />
      <!-- 筛选组件 -->
      <div class="types">
        <FilterTypes :funcName="funcName" />
      </div>
    </el-header>
    <el-main> </el-main>
  </el-container>
</template>

<script>
import Header from "../../components/Header.vue";
import FilterTypes from "./FilterTypes/FilterTypes.vue";

export default {
  components: { Header, FilterTypes },
  name: "GoodsCategory",
  props: {
    funcName: {
      type: String,
      default() {
        return "默认名称";
      },
    },
  },
  provide() {
    return {
      sendTypeProvide: this.sendType,
    };
  },
  methods: {
    //用于接收 三个筛选组件传递来的信息 并访问接口
    sendType(data,types) {
      if(types === 'Classify'){
        //分类

      }else if(types === 'Sortord'){
        //排序 
      }else if(types === 'Filtrate'){
        //筛选 
        let datas = [];
        data.forEach(obj => {
            datas.push(obj.keyword);
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
#GoodsCategory {
  & > .el-header {
    position: absolute;
    width: 100vw;
    top: 0;
    padding: 0;
    height: auto !important;
  }
  & > .el-main {
    padding: 0;
  }
}
</style>