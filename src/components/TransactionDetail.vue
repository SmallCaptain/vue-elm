//公用组件 明细 
// 目前用于交易与积分兑换明细
<template>
  <div class="TransactionDetail">
    <div class="title">
      <!-- 题目标题 -->
      <p>{{ title.name }}</p>
    </div>
    <div class="main">
      <!-- 如果暂时没交易记录显示的内容 -->
      <div class="none" v-if="true">
        <div class="msg">
          <img :src="title.img" alt="" />
          <p>{{title.msg}}</p>
          <slot name="methion"></slot>
        </div>
      </div>
      <!-- 有交易记录显示的内容 -->
      <div class="detail">
        <!-- 余额和积分都用到了该组件 用插槽自主决定 -->
        <slot name="detail"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TransactionDetail",
  props: {
    // 交易记录
    detail: {
      type: Object,
    },
    // tite标题 对象 可以容纳更多信息
    title: {
      type: Object,
      default: function () {
        return {
          name: "只是默认的标题。。",
        };
      },
    },
  },
};
</script>

<style lang="less" scoped>
div.TransactionDetail {
  & > div.title {
    & > p {
      margin: 0;
      padding: 20px 0 20px 30px;
      color: #999;
      font-size: 28px;
    }
  }
  & > div.main {
    & > div.none {
      & > div.msg {
        position: absolute;
        top: 65%;
        left: 50%;
        transform: translate(-50%, -50%);
        & > p {
          font-size: 33px;
          padding: 0;
          margin: 0;
          padding-top: 20px;
          text-align: center;
        }
        & > img{
            height: 280px;
            width: 280px;
            object-fit: cover;
        }
      }
    }
  }
}
</style>