<template>
  <el-container id="SearchMerchants">
    <el-header>
      <!-- 标题 -->
      <Header :fucName="fucName"></Header>
      <!-- 搜索框 -->
      <Search :text="text" @delText="delText" @toSearch="toSearch" />
    </el-header>
    <el-main>
      <!-- //商家列表 -->
      <div v-if="showMerchants" class="MerchantList">
        <h4>商家</h4>
        <div class="Merchants">
          <nearby-shops
            :item="item"
            v-for="(item, index) in merchantList"
            :key="index"
          />
        </div>
      </div>
      <!--历史搜索记录-->
      <div v-if="showHistory && !showMerchants" class="searchHistory">
        <h4>搜索历史</h4>
        <div
          class="historyMsg"
          v-for="(item, index) in searchHistory"
          :key="index"
          @click="reSetText(item)"
        >
          <span class="name">{{ item }}</span>
          <span class="del" @click.stop="delMsg(index)">x</span>
        </div>
        <div @click="clearHistory" class="clearHistory">清空搜索历史记录</div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Header from "../../components/Header.vue";
import NearbyShops from "../TakeOut/NearbyShops.vue";
import Search from "./Search.vue";
export default {
  name: "SearchMerchants",
  components: {
    Header,
    Search,
    NearbyShops,
  },
  data() {
    return {
      fucName: "搜索",
      merchantList: [],
      searchHistory: [],
      showHistory: false,
      showMerchants: false,
      text: "",
    };
  },
  methods: {
    reSetVuxRoute() {
      //进来后 把vuex中路由信息更新
      let fullPath = this.$router.history.current.fullPath;
      let path = fullPath.split("/")[fullPath.split("/").length - 1];
      this.$store.dispatch("nav/setRouteName", path);
    },
    toSearch(text) {
      if (text !== "") {
        let flag = false; //表示 并不存在相同的历史记录值
        this.searchHistory.forEach((item) => {
          if (item === text) {
            flag = true;
          }
        });
        if (!flag) this.searchHistory.push(text);
        sessionStorage.setItem("searchHistory", this.searchHistory);
        //后续发送ajax请求获取商家列表
        this.$axios
          .post("/merchant/searchStore",{
            keyword:text
          })
          .then((result) => {
            if (result.data !=='null' && result.data.length !==0) {
              this.merchantList = result.data;
              this.showMerchants = true;
            }
          })
          .catch((err) => {
            this.$message({
              type: "error",
              message: "网络请求出错。。",
            });
            console.log(err);
            this.showMerchants = false;
          });
      }
    },
    resetSearchHistory() {
      let history = sessionStorage.getItem("searchHistory");
      this.searchHistory =
        history === null || history === "" ? [] : history.split(",");
    },
    //删除特定条历史记录
    delMsg(index) {
      let newArr = this.searchHistory.filter((item, i) => {
        return i !== index;
      });

      this.searchHistory = newArr;
    },
    // 初始化历史记录可见
    initShowHistory() {
      if (this.searchHistory.length !== 0) {
        this.showHistory = true;
      } else this.showHistory = false;
    },
    // 删除搜索栏信息
    delText() {
      //text 清空
      this.text = "";
      //   不显示商家
      this.showMerchants = false;
      //再次初始化历史记录
      this.initShowHistory();
    },
    // 清空历史记录
    clearHistory() {
      this.searchHistory = [];
    },
    reSetText(searchtext) {
      this.text = searchtext;
    },
  },
  watch: {
    searchHistory: {
      handler(newV) {
        //搜索历史不为0时
        if (newV.length !== 0) {
          sessionStorage.setItem("searchHistory", newV);
        } else {
          sessionStorage.removeItem("searchHistory");
          this.showHistory = false;
        }
      },
    },
  },
  created() {
    //重更新路由设置
    this.reSetVuxRoute();
    // 重设置搜索历史
    this.resetSearchHistory();

    //刚进来时初始化可见历史搜索记录
    this.initShowHistory();
  },
};
</script>

<style lang="less" scoped>
#SearchMerchants {
  margin-bottom: 94px;
  & > .el-header {
    padding: 0;
    margin: 0;
    height: auto !important;
  }
  & > .el-main {
    padding: 0;
    margin: 0;

    & > div.MerchantList {
      & > h4 {
        color: #666;
        font-weight: 700;
        margin: 0;
        font-size: 28px;
        height: 94px;
        line-height: 94px;
        padding-left: 25px;
      }
    }

    & > div.searchHistory {
      & > h4 {
        color: #666;
        font-weight: 700;
        margin: 0;
        font-size: 28px;
        height: 94px;
        line-height: 94px;
        padding-left: 25px;
      }
      & > div.historyMsg {
        display: flex;
        justify-content: space-between;
        height: 94px;
        line-height: 94px;
        font-size: 32px;
        color: #333;
        padding-left: 20px;
        background-color: #fff;
        border-bottom: 1px solid #e4e4e4;

        & > span.del {
          margin-right: 80px;
          color: #666;
        }
      }

      & > div.clearHistory {
        background-color: #fff;
        height: 94px;
        line-height: 94px;
        text-align: center;
        font-size: 32px;
        font-weight: 700;
        color: #3190e8;
      }
    }
  }
}
</style>