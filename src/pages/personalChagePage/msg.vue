<template>
  <div id="msg">
    <div class="perImg">
      <!-- 个人头像 -->
      <div class="msg">
        <span>头像</span>
        <div class="img">
          <el-upload
            class="avatar-uploader"
            action="http://124.222.90.62:5115/user/chageAvatar"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :headers="{
              Authorization: token,
            }"
          >
            <img v-if="userCopy.img" :src="userCopy.img" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
    </div>
    <jump-to-func
      v-for="(item, index) in assetInfo"
      :funcData="item"
      :key="index"
    >
      <template v-if="index === 0" v-slot:username>
        <span class="userNameSlot">{{ username }}</span>
      </template>
    </jump-to-func>
  </div>
</template>

<script>
import JumpToFunc from "../../components/JumpToFunc.vue";
export default {
  components: { JumpToFunc },
  name: "msg",
  props: {
    user: {
      type: Object,
    },
  },
  data() {
    return {
      // 功能名称
      assetInfo: [
        {
          funcName: "用户名",
          pathName: "chageUserName",
          icon: "",
          color: "",
        },
        {
          funcName: "收货地址",
          pathName: "receiveAdressChage",
          icon: "",
          color: "",
        },
      ],
      //头像
      imageUrl: "",
      username: "",
      userCopy: {},
      token: "",
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      if (res.status === 200) {
        // this.$set(this.userCopy,'img',res.src)
        this.$emit("updateImg", res.src);
        // this.$router.go(0);
        window.location.reload();
      } else {
        this.$message({
          type: "error",
          message: res.msg,
        });
      }
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
  mounted() {
    this.imageUrl = this.userCopy.img;
    this.username = this.$store.state.user.user.username;
    // 获取token
    let token = this.$store.state.user.user.Token;
    if (token !== undefined || token !== null) {
      this.token = `Bearer ${token}`;
    }
  },
  watch: {
    user: {
      handler() {
        this.userCopy = this.user;
      },
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
div#msg {
  position: relative;
  & > div.perImg {
    margin-top: 30px;
    & > div.msg {
      display: flex;
      justify-content: space-between;
      height: 145px;
      padding-left: 50px;
      padding-top: 20px;
      padding-bottom: 20px;
      box-sizing: border-box;
      background-color: white;
      border-bottom: 2px solid #f5f5f5;

      & > span {
        font-size: 32px;
        line-height: 105px;
      }
      & > div.img {
        display: flex;
        img.avatar {
          width: 100px !important;
          height: 100px !important;
          border: 1px solid transparent;
          border-radius: 100%;
        }

        & > i {
          font-size: 32px;
          color: rgb(187, 187, 187);
          line-height: 105px;
          padding-right: 9px;
        }
      }
    }
  }
}
</style>