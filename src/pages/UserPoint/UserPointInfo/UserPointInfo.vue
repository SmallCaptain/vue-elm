<template>
  <el-container id="UserPointInfo">
    <el-header>
      <Header :fucName="func.funcName" />
    </el-header>
    <el-main>
      <div class="infoContainer" v-for="(item, index) in info" :key="index">
        <p class="question">{{ item.question }}</p>
        <p class="answer">{{ item.answer }}</p>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Header from "../../../components/Header.vue";
export default {
  components: { Header },
  name: "UserPointInfo",
  props: {
    info: {
      type: Array,
      default: function () {
        return [
          {
            question: "Q1: 怎么获得积分？",
            answer: "为了保护账户安全，使用余额前必须先绑定手机号。",
          },
          {
            question: "Q2: 积分用来做什么？",
            answer:
              "余额可以在饿了么平台上提现，当余额大于等于待支付金额时可以在支持在线支付的商家中进行消费。提现功能将于2016年12月25日00:00全面开放。",
          },
          {
            question: "Q3: 礼品兑换很多天了还没有收到，该怎么办？",
            answer:
              "为了保护账户和资金安全，您在提现前需要输入真实姓名和用该姓名开通的银行卡号、选择开户行，并验证已绑定饿了么账号的手机号。每日只能提现1次，每次限额50元。若提现金额超过50元，点击【提现】时系统会提示您已超额，请您修改提现金额。",
          },
          {
            question:
              "Q4: 礼品兑换中的手机充值卡兑换，怎么样进行充值，充值之前会和我电话确认嘛？",
            answer:
              "可能原因有：您的姓名、开户行、银行卡号等信息不匹配；您当日的提现次数和金额超过限制；您的账户存在异常，被风控拦截。。",
          },
        ];
      },
    },
  },
  data() {
    return {
      func: {
        funcName: "积分说明",
      },
    };
  },
};
</script>

<style lang="less" scoped>
#UserPointInfo {
  background-color: white;
  height: 100vh;
  & > .el-header {
    padding: 0;
    margin: 0;
    height: auto !important;
  }
  & > .el-main {
    padding: 0;
    margin: 0;
    & > div.infoContainer {
      padding: 18px;
      & > p.question {
        color: #333;
        font-size: 35px;
        padding: 0;
        margin: 0;
      }
      & > p.answer {
        color: #666;
        font-size: 30px;
        padding: 0;
        margin: 0;
        padding-top: 20px;
        line-height: 40px;
      }
    }
  }
}
</style>