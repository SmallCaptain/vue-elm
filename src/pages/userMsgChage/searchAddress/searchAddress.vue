<template>
  <el-container id="searchAddress">
    <el-header>
      <Header :fucName="func.funcName" />
    </el-header>
    <el-main>
      <!-- 搜索框 -->
      <div class="searchContain">
        <div class="search">
          <input
            type="text"
            v-model="search"
            placeholder="请输入小区/写字楼/学校等"
          />
          <button type="button" @click="searchArea">搜索</button>
        </div>
      </div>
      <!-- methion提示 -->
      <div class="methion">
        <p>{{ methion }}</p>
      </div>
      <!-- 内容展示 -->
      <div class="msgShow">
        <div class="searchItems" v-if="content.if">
          <search-item
            v-for="(item, index) in searchData"
            :key="index"
            :itemData="item"
          />
        </div>
        <div class="contentNull" v-if="!content.if">
          <p v-for="(item, index) in congtentP" :key="index">
            {{ item }}
          </p>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Header from "../../../components/Header.vue";
import SearchItem from "./searchItem.vue";
export default {
  components: { Header, SearchItem },
  name: "searchAddress",
  data() {
    return {
      func: {
        funcName: "搜索地址",
      },
      methion: "为了满足商家的送餐需求,建议您从列表中选择地址",
      content: {
        msg: "",
        if: true, //false表示目前没搜索到内容
      },
      searchData: {},
      search: "",
      congtentP: [
        "找不到地址？",
        "请尝试输入小区、写字楼或学校名",
        "详细地址(如门牌号) 可稍后输入哦。",
      ], //用来设计显示提醒字段
    };
  },
  methods: {
    searchArea() {
      // 先获取 vuex中的 areaId 然后 再拼接上查询关键字进行查询
      let search = this.search;
      let id = sessionStorage.getItem("mine")
        ? JSON.parse(sessionStorage.getItem("mine")).chageRecive.nowPosistion
            .areaId
        : "";
      if (search !== "") {
        let params = {
          keyword: search,
          city_id: id,
        };
        this.$axiosP
          .get("v1/pois", {
            params,
          })
          .then((result) => {
            this.searchData = result.data;
          })
          .catch((err) => {
            console.log(err);
            this.$message({
              message: "请求出错！",
              type: "error",
            });
          });
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    // 路由守卫访问不到vc实例对象 阿哲。。。。
    let id = sessionStorage.getItem("mine")
      ? JSON.parse(sessionStorage.getItem("mine")).chageRecive.nowPosistion
          .areaId
      : "";
    if (id !== "") {
      //说明有定位 可以放行
      next();
    } else {
      alert("请先登录哦。。");
      window.history.back();
    }
  },
};
</script>

<style lang="less" scoped>
#searchAddress {
  & > .el-header {
    padding: 0;
    margin: 0;
    height: auto !important;
  }
  & > .el-main {
    padding: 0;
    margin: 0;
    & > div.searchContain {
      background-color: white;
      & > div.search {
        margin: 0 auto;
        width: 92%;
        display: flex;
        padding: 23px;
        & > input {
          flex: 4;
          color: #333;
          font-size: 28px;
          height: 80px;
          outline: none;
          border: 1px solid #ddd;
          margin-right: 20px;
          padding: 18px;
          box-sizing: border-box;
          background-color: #f2f2f2;
          border-radius: 5px;
        }
        & > button {
          flex: 1;
          font-size: 30px;
          color: white;
          background-color: #3190e8;
          border: 1px solid transparent;
          border-radius: 5px;
        }
      }
    }
    & > div.methion {
      height: 38px;
      padding: 9px 0;
      background-color: #fff6e4;
      & > p {
        margin: 0;
        width: 90%;
        margin: 0 auto;
        text-align: center;
        height: 100%;
        line-height: 38px;
        color: #ff963f;
        font-size: 30px;
      }
    }
    & > div.msgShow {
      & > div.contentNull {
        position: absolute;
        width: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        & > p {
          padding: 0;
          margin: 0 0 10px 0;
          font-size: 30px;
          color: #969696;
          text-align: center;
        }
      }
    }
  }
}
</style>