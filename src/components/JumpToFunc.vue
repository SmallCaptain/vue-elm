//组件 跳转功能 
// 需要提供的数据
//  左侧icon 功能名称 funcName 跳转的路由名称 pathName
<template>
  <div class="JumpToFunc">
    <div class="container" @click="toPath(funcData.pathName)">
      <i id="icon" :style="{color:funcData.color}" :class="funcData.icon"></i>
      <span>{{ funcData.funcName }}</span>
      <i id="jump" class="el-icon-arrow-right"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "JumpToFunc",
  props: {
    funcData: {
      type: Object,
      default: () => {
        return {
          icon: "el-icon-refresh-left",
          funcName: "无数据",
          pathName: "无数据",
          color:'rgb(102, 102, 102)'
        };
      },
    },
  },
  methods:{
      toPath(pathName){
          alert('将要跳转的路由为: ',pathName)
      }
  }
};
</script>

<style lang="less" scoped>
div.JumpToFunc {
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 85px;
  background-color: white;
  border-bottom: 2px solid #F5F5F5;

  & > div.container {
    display: flex;

    & > i#icon {
      margin-left: 50px;
      flex: 2;
      font-size: 50px;
      line-height: 42px;
    }
    & > i#jump {
      flex: 1;
      font-size: 32px;
      color: rgb(187, 187, 187);
      line-height: 42px;

    }
    & > span {
      flex: 16;
      font-size: 32px;
      color: #333;
      font-weight: 400;
    }
  }
}
</style>