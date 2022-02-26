// 头部部分 但带有搜索 和 返回个人信息
<template>
  <div id="HeaderSearch">
    <div class="search">
      <i @click="toSearch" class="el-icon-search"></i>
    </div>
    <div class="area">{{ area.name }}</div>
    <div class="personal">
      <i @click="toPersonal" class="el-icon-user-solid"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderSearch",
  data() {
    return {
      area: {
        name: "默认。",
      },
    };
  },
  methods:{
      toSearch(){
          alert('跳转至搜索');
      },
      toPersonal(){
          alert('跳转至个人信息');
      }
  }
};
</script>

<style lang="less" scoped>
@height :90px;
div#HeaderSearch {
  display: flex;
  position: relative;
  height: @height;
  background-color: #3190e8;
  & > div.search {
    flex: 1;

    & > i.el-icon-search {
      position: absolute;
      top: 50%;
      left: 10%;
      transform: translateY(-50%);
      font-size: 50px;
      color: white;
    }
  }
  & > div.area {
    flex: 1;
    font-size: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: white;
    text-align:center;
    line-height: @height;
  }
  & > div.personal {
    flex: 1;
    position: relative;
    & > i.el-icon-user-solid{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        font-size: 40px !important;
        color: white;

    }
  }
}
</style>