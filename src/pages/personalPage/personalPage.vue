<template>
  <transition name="fade">
    <el-container id="container">
      <el-header style="height: auto">
        <!-- 头部 放置组件 -->
        <Header :fucName="fuc.fucName" />
      </el-header>
      <el-main>
        <!-- 主体部分 -->
        <!-- 第一部分 头像 登录注册 + 余额信息等 -->
        <div class="msg">
          <person-img />
        </div>
        <!-- 第二部分 订单、商城、会员卡 -->
        <div class="func">
          <jump-to-func
            v-for="(item, index) in userFunc"
            :key="index"
            :funcData="item"
          />
        </div>
        <!-- 第三部分 客服和相关详细说明选项 -->
        <div class="help">
          <jump-to-func
            v-for="(item, index) in service"
            :key="index"
            :funcData="item"
          />
        </div>
      </el-main>
    </el-container>
  </transition>
</template>

<script>
import Header from "../../components/Header.vue";
import JumpToFunc from "../../components/JumpToFunc.vue";
import PersonImg from "./personImg.vue";
export default {
  name: "personalPage",
  components: {
    Header,
    PersonImg,
    JumpToFunc,
  },
  data() {
    return {
      fuc: {
        fucName: "个人",
      },
      // 功能的数据
      userFunc: [
        {
          icon: "el-icon-tickets",
          funcName: "我的订单",
          pathName: "",
          color: "rgb(102, 102, 102)",
        },
        {
          icon: "el-icon-present",
          funcName: "积分商城",
          pathName: "",
          color: "#FC7B53",
        },
        {
          icon: "el-icon-s-flag",
          funcName: "饿了么会员卡",
          pathName: "",
          color: "#FFC636",
        },
      ],
      // 服务功能的数据
      service: [
        {
          icon: "el-icon-tickets",
          funcName: "服务中心",
          pathName: "",
          color: "#4AA5F0",
        },
        {
          icon: "el-icon-tickets",
          funcName: "下载饿了么APP",
          pathName: "",
          color: "#4AA5F0",
        },
      ],
    };
  },
  methods: {
    async getPosition() {
      // 先向 vuex 请求数据 注：vuex被设置存储在了sessionStorge中 可以防止切回个人页面多次请求数据

      let area = this.$store.state.chageRecive.nowPosistion.area;
      if (area === "") {
        //为空时 说明需要向后台请求数据
        //直接向 请求接口 请求当前定位信息
        let data = await new Promise((resolve, reject) => {
          this.$axiosP
            .get("v1/cities?type=guess")
            .then((result) => {
              alert(JSON.stringify(result.data));
              console.log("@result", result);
              resolve(result.data);
            })
            .catch((err) => {
              console.log("@error", err);
              alert(err);
              alert("定位炸啦！");
              reject(undefined);
            });
        });
        // 在请求成功后将数据写入vuex 如果不成功 则在间隔5s内 发送数据
        while (data === undefined) {
          data = await new Promise((resolve, reject) => {
            setTimeout(() => {
              this.$axiosP
                .get("v1/cities?type=guess")
                .then((result) => {
                  console.log("@result", result);
                  resolve(result.data);
                })
                .catch((err) => {
                  console.log("@error", err);
                  reject(undefined);
                });
            }, 5000);
          });
        }
        // 保证 data不为underfined的前提下 将数据写入vuex  后续再发送城市信息写入数据库
        if (data !== undefined) {
          this.$store.dispatch("chageRecive/setNowPosistion", data);
        }
      }
    },
    reSetVuxRoute() {
      //进来后 把vuex中路由信息更新
      let fullPath = this.$router.history.current.fullPath;
      let path = fullPath.split("/")[fullPath.split("/").length - 1];
      this.$store.dispatch("nav/setRouteName", path);
    },
  },
  created() {
    // 进行判断是否需要重新获取定位数据
    this.getPosition();
    this.reSetVuxRoute();

    this.$axios.post("login/getIp")
      .then((result) => {
        alert(JSON.stringify(result.data));
        console.log(result);
      })
      .catch((err) => {
        alert(err)
        console.log(err);
      });
  },
};
</script>

<style lang="less" scoped>
@height: 90px;
#container {
  position: relative;
  & > .el-header {
    position: fixed;
    top: 0;
    width: 100vw;
    padding: 0;
  }
  & > .el-main {
    padding: @height 0 0 0;

    & > div.func {
      margin-top: 20px;
    }
    & > div.help {
      margin-top: 20px;
    }
  }
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
.fade-leave-active,
.fade-enter-active {
  transition: all 1s;
}
.fade-leave-active {
  display: none;
}
</style>