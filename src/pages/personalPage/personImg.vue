// 个人页面的第一个组件部分
// 包含登录 注册 以及相关信息的展示
<template>
  <div class="pernalMsg">
    <div class="personalImg">
      <div @click="toMsg" class="msg">
        <!-- 个人信息 包含头像 以及登录功能 -->
        <div class="photo">
          <img :src="imageUrl" crossorigin="anonymous" alt="" />
        </div>
        <div class="func">
          <!-- 后续由后台返回数据名而定 -->
          <p v-show="isLogin">{{ user.username }}</p>
          <p v-show="!isLogin">登录|注册</p>
          <div class="phone">
            <i class="el-icon-mobile"></i>
            <!-- 由后台拿取 -->
            <span v-show="isLogin">{{ user.phone }}</span>
            <span v-show="!isLogin">暂未绑定手机号</span>
          </div>
        </div>
        <div class="toLogin">
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
    </div>
    <!-- 显示余额等信息 -->
    <div class="assetInfo">
      <ul>
        <!-- 记得添加路由跳转事件 -->
        <li
          v-for="(item, index) in user.assetInfo"
          @click="toPath(item.path)"
          :key="index"
        >
          <div class="unitNum">
            <span class="num" :style="{ color: item.color }">{{
              item.num
            }}</span>
            <span class="unit">{{ item.unit }}</span>
          </div>
          <div class="unitName">{{ item.name }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "personalImg",
  data() {
    return {
      // 头像的路径 后面修改为从后台获取
      // http:\localhost:5115\public\img\defalut_avatar.jpg
      imageUrl: require("@/images/defalut_avatar.jpg"),
      user: {
        username: "",
        phone: "暂未绑定手机号",
        assetInfo: [
          {
            name: "我的余额",
            unit: "元",
            num: 0.0,
            color: "#FF9900",
            path: "UserWallect",
          },
          {
            name: "我的优惠",
            unit: "个",
            num: 0,
            color: "#FF5F3E",
            // path: "UserDiscounts",
            path:'RedPacket'
          },
          {
            name: "我的积分",
            unit: "分",
            num: 0,
            color: "#69C00B",
            path: "UserPoint",
          },
        ],
      },

      isLogin: "",
    };
  },
  methods: {
    //   加在与登录相关上的事件 根据是否登录改变路由 去往个人信息||登录|注册
    toMsg() {
      if (this.isLogin) {
        // 已登录、、、
        this.$router.push({
          path:'/PerChageUserMsg'
        })
      } else {
        // 未登录。。。。
        this.$router.push({
          name: "login",
        });
      }
    },
    //从vuex 获取登录状态
    auToken() {
      this.isLogin = this.$store.state.user.user.isLogin;
      this.user.username = this.$store.state.user.user.username;
    },
    toPath(pathName) {
      this.$router.push({
          name:pathName
      });
    },
  },
  created() {
    // 从vuex中获取登录状态
    this.auToken();
    // 当在登录状态下时 访问后台获取相关数据 图片+余额信息等
    if (this.isLogin) {
      console.log("已登录");
      this.$axios
        .post("user/getUserMsg",{
          username:this.username
        })
        .then((result) => {
          // console.log(result.data);
          if (result.data.status === 401) {
            this.$message({
              message: result.data.msg,
              type: "error",
            });
          }else{//令牌正常
            this.user.phone=result.data.user.phone ==='无'?this.user.phone:result.data.user.phone;
            this.user.assetInfo[0].num=result.data.user.money;
            this.user.assetInfo[1].num=result.data.user.preferential_number;
            this.user.assetInfo[2].num=result.data.user.integrate;
            this.imageUrl=result.data.user.img;
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            message: "网络出错啦",
            type: "error",
          });
        });
    }
  },
};
</script>

<style lang="less" scoped>
div.pernalMsg {
  & > div.personalImg {
    height: 170px;
    background-color: #3190e8;
    padding: 30px 26px 30px 26px;
    border-top: 4px solid #62aaec;
    div.msg {
      display: flex;
      width: 100%;
      height: 170px;

      div.photo {
        flex: 4;
        padding-right: 20px;
        & > img {
          width: 100%;
          height: 100%;
          border: 1px solid transparent;
          border-radius: 100%;
          overflow: hidden;
        }
      }
      div.func {
        flex: 10;
        display: flex;
        flex-direction: column;
        & > p {
          flex: 1;
          padding: 0;
          padding-top: 20px;
          margin: 0;
          color: white;
          font-size: 40px;
          font-weight: bold;
        }
        & > div.phone {
          flex: 1;
          & > i {
            color: white;
            font-size: 40px;
            font-weight: bold;
          }
          & > span {
            color: white;
            font-size: 30px;
          }
        }
      }
      div.toLogin {
        flex: 1;
        position: relative;

        & > i {
          position: absolute;
          color: white;
          font-size: 40px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
  & > div.assetInfo {
    & > ul {
      display: flex;
      & > li {
        display: flex;
        flex-direction: column;
        width: 250px;
        height: 170px;
        background-color: white;
        border-right: 6px solid #f5f5f5;

        & > div.unitNum {
          flex: 2;
          text-align: center;
          padding-top: 36px;
          & > span.num {
            font-size: 46px;
            font-weight: bold;
            max-width: 76%;
            display: inline-block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            vertical-align: bottom;
          }
          & > span.unit {
            font-size: 25px;
          }
        }
        & > div.unitName {
          flex: 1;
          text-align: center;
          font-size: 26px;
          color: #666;
        }
      }
    }
  }
}
</style>