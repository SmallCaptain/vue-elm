<template>
  <el-container id="GoodsCategory">
    <el-header>
      <Header :fucName="funcNameCopy" />
      <!-- 筛选组件 -->
      <div class="types">
        <FilterTypes :funcName="funcNameCopy" />
      </div>
    </el-header>
    <el-main>
      <!-- 渲染商家列表 -->
      <div class="merchants">
        <nearby-shops
          v-for="(item, index) in merchantList"
          :key="index"
          :item="item"
        />
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Header from "../../components/Header.vue";
import NearbyShops from "../TakeOut/NearbyShops.vue";
import FilterTypes from "./FilterTypes/FilterTypes.vue";

export default {
  components: { Header, FilterTypes, NearbyShops },
  name: "GoodsCategory",
  props: {
    funcName: {
      type: String,
      default() {
        return "默认名称";
      },
    },
  },
  data() {
    return {
      merchantList: [],
      funcNameCopy: "",
      merchantListCopy: [],
      merchantType:''
    };
  },
  provide() {
    return {
      sendTypeProvide: this.sendType,
      searchAllProvide: this.initMerchants,
    };
  },
  methods: {
    //用于接收 三个筛选组件传递来的信息 并访问接口
    sendType(data, types, name) {
      if (types === "Classify") {
        //分类
        // console.log(data);
        this.sendAjax("merchant/getMerchantByClassify", data);
        this.merchantType = data;
        this.funcNameCopy = name;
      } else if (types === "Sortord") {
        //排序
        this.sendAjax("merchant/searchMerchantBySort",data);
      } else if (types === "Filtrate") {
        //筛选
        this.doFilter(data);
      }
    },
    //初始化商家数据 全部
    async initMerchants() {
      let data = await new Promise((resolve, reject) => {
        this.$axios
          .post("merchant/getStore")
          .then((result) => {
            if (result.data.status === 200) {
              resolve(result.data.data);
            } else {
              reject(null);
            }
          })
          .catch((err) => {
            console.log(err);
            reject(null);
          });
      });
      if (data !== null) {
        this.merchantList = data;
        this.merchantListCopy = data;
      }
      this.merchantType='';
    },
    //发送 ajax请求函数 参数1 api 参数2 查询值
    sendAjax(api, data = null) {
      this.$axios
        .post(api, {
          type: data,
          classify:this.merchantType
        })
        .then((result) => {
          if (result.data.status === 200) {
            this.merchantList = result.data.data;
            this.merchantListCopy = this.merchantList;
          } else {
            this.$message({
              type: "error",
              message: "没有相关数据",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            type: "erorr",
            message: "网络出错",
          });
        });
    },
    //Filtrate 筛选函数
    doFilter(data) {
      //data是筛选条件
      // 获取筛选条件
      let datas = {};
      data.forEach((obj) => {
        datas[obj.keyword] = 1;
      });
      //console.log(datas);
      //对备份数据进行筛选 将使用数据部分覆盖 filter不改变原数组
      this.merchantList = this.merchantListCopy.filter((item)=>{
        let flag = true;
        for(let key in datas){ //datds没有属性时不会进入 效果相当于全选
          if(Object.prototype.hasOwnProperty.call(datas,key)){
            //忽略继承属性 防止出错 0表示不支持
            if(item[key] !== datas[key]) return false;
          }

        }
        return flag;
      });
    },
  },

  created() {
    this.initMerchants();
    this.funcNameCopy = this.funcName;
  },
};
</script>

<style lang="less" scoped>
#GoodsCategory {
  & > .el-header {
    position: fixed;
    width: 100vw;
    top: 0;
    padding: 0;
    height: auto !important;
  }
  & > .el-main {
    padding: 0;
    margin-top: 170px;
    & > div.merchants {
      background-color: #fff;
    }
  }
}
</style>