// 管理修改地址
<template>
  <el-container id="receiveAdressChage">
    <el-header>
      <Header :fucName="func.funcName">
        <template v-slot:editSlot>
          <p @click="edit" class="editSlot">{{ editSlot.name }}</p>
        </template>
      </Header>
    </el-header>
    <el-main>
      <div class="havAddress">
        <!--目前已有的地址 封装成组件-->
        <ul>
          <recive-address
            @deleAddressItem="deleAddressItem"
            v-for="(item, index) in addressDetail"
            :key="index"
            :addressDetail="item"
            :delFlag="editSlot.on"
          />
        </ul>
      </div>
      <!-- 跳转至新增地址的页面 -->
      <jump-to-func class="addAddress" :funcData="assectInfo[0]" />
    </el-main>
  </el-container>
</template>

<script>
import Header from "../../components/Header.vue";
import JumpToFunc from "../../components/JumpToFunc.vue";
import ReciveAddress from "./reciveAddress.vue";
export default {
  components: { Header, JumpToFunc, ReciveAddress },
  name: "receiveAdressChage",
  data() {
    return {
      func: {
        funcName: "编辑地址",
      },
      assectInfo: [
        {
          icon: "",
          funcName: "新增地址",
          pathName: "addNewAddress",
          color: "rgb(102, 102, 102)",
        },
      ],
      editSlot: {
        name: "编辑",
        on: true,
      },
      // 目前已有的地址
      addressDetail: [],
      // 整合删除了地址的数据项
      delItem: [],
    };
  },
  methods: {
    edit() {
      this.editSlot.on = !this.editSlot.on;

      if (this.editSlot.on === false) {
        this.editSlot.name = "完成";
      } else this.editSlot.name = "修改";

      if (this.editSlot.on === true) {
        if (this.delItem.length !== 0) {
          this.$axios
            .post("user/delItem", this.delItem)
            .then((result) => {
              console.log(result);

              if (result.data.status === 200) {
                this.$message({
                  type: "success",
                  message: "修改成功~",
                });
              } else {
                this.$message({
                  type: "error",
                  message: "修改失败了~",
                });
                this.$router.go(0);
              }
            })
            .catch((err) => {
              console.log(err);
              this.$message({
                type: "error",
                message: "修改失败了~",
              });
            });
        }
      }
    },
    // 先从后端查询 看看是否有已有的地址 有的话 把目标数据写入vuex里
    async checkReciveAddress() {
      let data = await new Promise((resolve, reject) => {
        this.$axios
          .post("/user/getAddress")
          .then((result) => {
            resolve(result.data);
          })
          .catch((err) => {
            console.log(err);
            reject(null);
          });
      });
      if (!data) {
        //null可以转化为true 进来表明出错了

        this.$message({
          type: "error",
          message: "网络错误。。",
        });
      } else {
        if (data.length !== 0) {
          let newArr = [];
          //只要长度不为0 说明有数据了
          // 选择将数据推入 而不是直接替换 可能用户从新增地址跳回
          // 先重新整合数据 统一要用的
          data.forEach((item) => {
            let obj = {};
            obj["recive_area"] = item["recive_area"];
            obj["recive_area_detail"] = item["recive_area_detail"];
            obj["recive_name"] = item["recive_name"];
            obj["use_phone"] = item["use_phone"];

            newArr.push(obj);
          });
          console.log(data);
          //通知vuex 将数据一个个推入到对应数组里
          // newArr.forEach((item) => {
          //   this.$store.dispatch("chageRecive/pushAddress", item);
          // });
          // 数据设置到vuex中
          this.$store.dispatch("chageRecive/pushAddress", data);
          // 数据读取至本地
          this.addressDetail = data;
        }
      }
    },
    deleAddressItem(data) {
      console.log(data);
      let newArr = this.addressDetail.filter((item) => {
        if (data !== item.recive_area_detail) {
          return true;
        } else {
          this.delItem.push(item);
          return false;
        }
      });
      this.addressDetail = newArr;
    },
  },
  created() {
    this.checkReciveAddress();
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
      alert("定位还没有成功。。请先等待哦。。");
      window.history.back();
    }
  },
};
</script>

<style lang="less" scoped>
#receiveAdressChage {
  & > .el-header {
    height: auto !important;
    padding: 0;
    margin: 0;

    p.editSlot {
      margin: 0;
      padding: 0;
      position: absolute;
      right: 30px;
      top: 50%;
      left: auto;
      transform: translateY(-50%);
      font-size: 40px;
      color: white;
    }
  }
  & > .el-main {
    padding: 0;
    margin: 0;

    & > .addAddress {
      margin-top: 20px;
    }
    & > .havAddress {
      & > ul {
        padding: 0;
        margin: 0;
        margin-top: 20px;
        list-style: none;
      }
    }
  }
}
</style>