//用户修改姓名
<template>
  <el-container id="userNameChage">
    <el-header>
      <Header :fucName="func.fucName" />
    </el-header>
    <el-main>
      <div class="chageUserNameContainer">
        <div class="chageUserName">
          <input
            autocomplete="off"
            :style="{ borderColor: methionShow ? '#e7e7e7' : 'red' }"
            v-model="userName"
            type="text"
            placeholder="输入用户名"
            id="userName"
          />
          <span v-show="methionShow" class="methion"
            >用户名只能修改一次 (5-24字符之间)</span
          >
          <span v-show="!methionShow" class="errMethion"
            >用户名长度在5-24之间</span
          >
        </div>
      </div>
      <el-button @click="chageUserName" type="primary" :disabled="canChage"
        >确认修改</el-button
      >
    </el-main>
  </el-container>
</template>

<script>
import Header from "../../components/Header.vue";
export default {
  components: { Header },
  name: "userNameChage",
  data() {
    return {
      func: {
        fucName: "修改用户名",
      },
      canChage: true,
      userName: "",
      methionShow: true,
    };
  },
  methods: {
    chageUserName() {
      let data = {
        userName: this.userName,
      };
      this.$axios.post("user/chageUserName", data)
        .then((result) => {
          if (result.data.status === 200) {
            this.$message({
              type: "success",
              message: result.data.msg,
            });
            this.$store.dispatch('user/chageUserName',this.userName);
          } else {
            this.$message({
              type: "error",
              message: result.data.msg,
            });
          }
        })
        .catch((err) => {
          console.log(`err`, err);
          this.$message({
              type: "error",
              message: '未知错误修改失败',
            });
        });
    },
  },
  watch: {
    userName: {
      handler(newV) {
        if (newV.length >= 5 && newV.length <= 24) {
          this.methionShow = true;
          this.canChage = false;
        } else {
          this.methionShow = false;
          this.canChage = true;
        }
      },
    },
  },
};
</script>

<style lang="less" scoped>
#userNameChage {
  & > .el-header {
    padding: 0;
    margin: 0;
    height: auto !important;
  }
  & > .el-main {
    padding: 0;
    margin: 0;
    & > div.chageUserNameContainer {
      margin-top: 30px;

      & > div.chageUserName {
        width: 95%;
        margin: 0 auto;
        & > input#userName {
          display: block;
          height: 70px;
          font-size: 35px;
          outline: none;
          width: 100%;
          border: 4px solid #e7e7e7;
          box-sizing: border-box;
          background-color: transparent;
        }
        & > span {
          display: inline-block;
          color: #666666;
          margin: 0 auto;
          font-size: 20px;
          padding: 25px 0 25px 0;
          height: 30px;
        }
        & > span.errMethion {
          color: red;
          font-size: 25px;
        }
      }
    }
    & > .el-button {
      display: block;
      height: 93px;
      width: 95%;
      margin: 0 auto;
      font-size: 40px;
    }
  }
}
</style>