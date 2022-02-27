// 个人页面的第一个组件部分
// 包含登录 注册 以及相关信息的展示
<template>
  <div class="pernalMsg">
    <div class="personalImg">
      <div @click="toMsg" class="msg">
        <!-- 个人信息 包含头像 以及登录功能 -->
        <div class="photo">
          <img :src="imageUrl" alt="" />
        </div>
        <div class="func">
          <!-- 后续由后台返回数据名而定 -->
          <p v-if="isLogin"></p>
          <p v-if="!isLogin">登录|注册</p>
          <div class="phone">
            <i class="el-icon-mobile"></i>
            <!-- 由后台拿取 -->
            <span v-if="isLogin"></span>
            <span v-if="!isLogin">暂未绑定手机号</span>
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
        <li v-for="(item, index) in assetInfo" :key="index">
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
      imageUrl: "http://localhost:8080/img/defalut_avatar.ce6f12ea.jpg",
      isLogin: false,
      user: {},
      assetInfo: [
        {
          name: "我的余额",
          unit: "元",
          num: 0.0,
          color: "#FF9900",
          path: "",
        },
        {
          name: "我的优惠",
          unit: "个",
          num: 0,
          color: "#FF5F3E",
          path: "",
        },
        {
          name: "我的积分",
          unit: "分",
          num: 0,
          color: "#69C00B",
          path: "",
        },
      ],
    };
  },
  methods: {
    //   加在与登录相关上的事件 根据是否登录改变路由 去往个人信息||登录|注册
    toMsg() {
      if (this.isLogin) {
        // 已登录、、、
      } else {
        // 未登录。。。。
        this.$router.push({
          name: "login",
        });
      }
    },
    //   验证token 存在时将isLogin设置为已登录
    auToken() {
      let Token = sessionStorage.getItem("Token");
      if (Token) this.isLogin = true;
    },
  },
  created() {
    // 验证token
    this.auToken();
  },
  beforeDestroy() {
    console.log("组件G了");
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
            font-size: 55px;
            font-weight: bold;
          }
          & > span.unit {
            font-size: 40px;
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