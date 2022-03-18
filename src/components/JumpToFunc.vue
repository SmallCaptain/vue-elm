//组件 跳转功能 
// 需要提供的数据
//  左侧icon 功能名称 funcName 跳转的路由名称 pathName
<template>
  <div class="JumpToFunc">
    <slot name="methion"></slot>
    <div class="container" @click="toPath(funcData.pathName)">
      <i
        id="icon"
        v-if="funcData.icon !== ''"
        :style="{ color: funcData.color }"
        :class="funcData.icon"
      ></i>
      <span>{{ funcData.funcName }}</span>
      <slot name="username"></slot>
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
          icon: "",
          funcName: "无数据",
          pathName: "无数据",
          color: "rgb(102, 102, 102)",
        };
      },
    },
  },
  methods: {
    toPath(pathName) {
      this.$router.push({
        name:pathName
      });
    },
  },
};
</script>

<style lang="less" scoped>
div.JumpToFunc {
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: white;
  border-bottom: 2px solid #f5f5f5;

  & > div.container {
    display: flex;
    margin-left: 50px;
    height: 85px;
    padding: 22px 0px;
    box-sizing: border-box;
    & > i#icon {
      flex: 1;
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
    & > .userNameSlot {
      position: absolute;
      right: 8vw;
      line-height: 40px;
      max-width: 250px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #A69999;
    }
    & > .methionSlotChage {
      position: absolute;
      left: 640px;
      max-width: 250px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #A69999;
    }
  }
  & > .methionSlot {
    background-color: #f5f5f5;
    font-size: 25px;
    height: 31px;
    padding: 19px;
    padding-left: 52px;
    color: #666666;
  }
}
</style>