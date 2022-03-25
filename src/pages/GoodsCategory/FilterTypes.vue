<template>
  <div id="FilterTypes">
    <div class="content">
      <!--组件内容-->
      <ul class="list">
        <li>
          <div class="select">
            <span>{{ funcName }} <i class="el-icon-caret-bottom"></i></span>
          </div>
        </li>
        <li>
          <div class="select">
            <span>排序 <i class="el-icon-caret-bottom"></i></span>
          </div>
        </li>
        <li>
          <div class="select">
            <span>筛选 <i class="el-icon-caret-bottom"></i></span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilterTypes",
  props: {
    funcName: {
      type: String,
    },
  },
};
</script>

<style lang="less" scoped>
div#FilterTypes {
  background-color: #ffff;
  & > div.content {
    & > ul.list {
      display: flex;
      list-style: none;
      border-bottom: 5px solid #fbfbfb;
      & > li {
        flex: 1;
        padding-top: 20px;
        height: 60px;

        & > div.select {
          height: 46.5px;
          display: flex;
          justify-content: center;

          border-right: 1px solid #e4e4e4;

          span:nth-child(1) {
            font-size: 25px;

            & > i {
              font-size: 20px;
            }
          }
        }
      }
    }
  }
}
</style>