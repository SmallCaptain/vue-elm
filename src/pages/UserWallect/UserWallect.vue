<template>
  <el-container id="UserWallect">
    <el-header>
      <Header :fucName="func.fucName" />
    </el-header>
    <el-main>
      <!-- 第一个部分 显示余额信息组件 -->
      <div class="showWallect">
        <Asset :asset="asset">
          <template v-slot:submitBtn>
            <el-button @click="submit" type="primary" :disabled="asset.btn"
              >提现</el-button
            >
          </template>
        </Asset>
      </div>
      <!-- 第二个部分 显示交易明细 -->
      <div class="transactionDetail">
          <transaction-detail :title="title" />
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Asset from "../../components/Asset.vue";
import Header from "../../components/Header.vue";
import TransactionDetail from '../../components/TransactionDetail.vue';
export default {
  components: { Header, Asset, TransactionDetail },
  name: "UserWallect",
  data() {
    return {
      func: {
        fucName: "我的余额",
      },
      asset: {
        methion: {
          name: "当前余额",
          explain: "余额说明",
        //   用于决定余额说明去哪个页面
          explainTo:'UserWallectInfo'
        },
        amount: 0,
        unit: "元",
        btn: true,
      },
      title:{
          name:'交易明细',
          img:require('@/images/TradeNone.png'),
          msg:'暂无明细记录'
      }
    };
  },
  methods: {
    submit() {
      //提现？
      alert("功能暂未开放");
    },
    async getData() {
      // #region
      //   let data = await new Promise((resolve, reject) => {
      //     this.$axios
      //       .post("user/getUserMsg")
      //       .then((result) => {
      //         resolve(result.data);
      //       })
      //       .catch((err) => {
      //         console.log(err);
      //         reject(null);
      //       });
      //   });
      //   if (data !== null) {
      //     this.asset.amount = data.user.money;
      //     if (this.asset.amount > 0) {
      //       this.asset.btn = false;
      //     }
      //   } else {
      //     this.$message({
      //       type: "error",
      //       message: "未知错误，获取余额失败，请刷新",
      //     });
      //   }
      //#endregion

      await Promise.all([this.getBalance()])
        .then((result) => {
          this.isSubmit(result[0].data.user.money);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getBalance() {
      console.log("调用请求余额");
      return new Promise((resolve, reject) => {
        this.$axios
          .post("user/getUserMsg")
          .then((result) => {
            resolve(result);
          })
          .catch((err) => {
            console.log(err);
            reject(null);
          });
      });
    },
    isSubmit(data) {
      this.asset.amount = data;
      //判断是否可以提现
      if (this.asset.amount > 0) {
        this.asset.btn = false;
      } else this.asset.btn = true;
    },
  },

  created() {
    //从后端获取数据先
    this.getData();
  },
};
</script>

<style lang="less" scoped>
#UserWallect {
  & > .el-header {
    height: auto !important;
    padding: 0;
    margin: 0;
  }
  & > .el-main {
    padding: 0;
    margin: 0;
    & > div.showWallect {
      .el-button {
        display: block;
        margin: 0 auto;
        width: 98%;
        font-size: 40px;
        padding: 23px;
        border: 1px solid transparent;
        border-radius: 10px;
      }
    }
  }
}
</style>