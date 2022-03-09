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
            <el-button @click="submit" type="danger" :disabled="asset.btn"
              >积分兑换商品</el-button
            >
          </template>
        </Asset>
      </div>
      <!-- 第二个部分 显示交易明细 -->
      <div class="transactionDetail">
        <transaction-detail :title="title">
          <template v-slot:methion>
            <p class="methion">快去下单赚取大量积分吧</p>
          </template>
        </transaction-detail>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Asset from "../../components/Asset.vue";
import Header from "../../components/Header.vue";
import TransactionDetail from "../../components/TransactionDetail.vue";
export default {
  components: { Header, Asset, TransactionDetail },
  name: "UserPoint",
  data() {
    return {
      func: {
        fucName: "我的积分",
      },
      asset: {
        methion: {
          name: "当前积分",
          explain: "积分说明",
          //   用于决定余额说明去哪个页面
          explainTo: "UserPointInfo",
        },
        amount: 0,
        unit: "分",
        btn: true,
      },
      title: {
        name: "最近30天积分记录",
        img: require("@/images/TradeNone.png"),
        msg: "最近30天无积分记录",
      },
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
          this.isSubmit(result[0].data.user.integrate);
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
    & > div.transactionDetail {
      p.methion {
        color: #999;
        margin-top: 15px;
        font-size: 25px;
        padding: 0;
      }
    }
  }
}
</style>