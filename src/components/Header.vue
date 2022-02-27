// 头部部分 不带搜索框 仅有返回和标签
<template>
  <div id="Header">
    <div class="goBack">
      <i @click="toBack" class="el-icon-arrow-left"></i>
    </div>
    <div class="fucName">
      {{ fucName }}
    </div>
    <div class="none"></div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    //   功能名称 需要提供
    fucName: {
      type: String,
      default: "无",
    },
  },
  methods:{
      toBack(){
          // alert('返回上一个页面');
          this.$router.go(-1);
      }
  }
};
</script>

<style lang="less" scoped>
@height: 90px;
div#Header {
  display: flex;
  height: @height;
  background-color: #3190e8;
  & > div.goBack {
    position: relative;
    flex: 1;

    & > i.el-icon-arrow-left{
      position: absolute;
      top: 50%;
      left: 10%;
      transform: translateY(-50%);
      font-size: 50px;
      color: white;
    }
  }
  & > div.fucName {
    flex: 2;
    font-size: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: white;
    text-align: center;
    // padding-left: 20%;
    line-height: @height;
    font-weight: bold;
  }
  & > div.none {
    flex: 1;
  }
}
</style>