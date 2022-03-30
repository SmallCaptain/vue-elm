// 新增地址页面
<template>
  <el-container id="addNewAddress">
    <el-header>
      <Header :fucName="func.funcName" />
    </el-header>
    <el-main>
      <div class="inputs clearfix">
        <div
          class="input clearfix"
          v-for="(item, index) in inputs"
          :key="index"
        >
          <input
            v-on="{ click: index === 1 ? getAddress : unless }"
            v-model="item.data"
            autocomplete="off"
            :placeholder="item.placeholder"
            type="text"
          />
          <span v-if="!item.confirm">{{ item.err }}</span>
        </div>
      </div>
      <el-button @click="toSubmit" type="success">新增地址</el-button>
    </el-main>
  </el-container>
</template>

<script>
import Header from "../../../components/Header.vue";
export default {
  components: {
    Header,
  },
  name: "addNewAddress",
  data() {
    return {
      func: {
        funcName: "新增地址",
      },
      inputs: [
        {
          name: "recive_name",
          placeholder: "请填写你的姓名",
          data: "",
          confirm: true,
          err: "请填写您的姓名",
        },
        {
          name: "recive_area",
          placeholder: "小区/写字楼/学校等",
          data: "",
          confirm: true,
          err: "",
        },
        {
          name: "recive_area_detail",
          placeholder: "请填写详细的送餐地址",
          data: "",
          confirm: true,
          err: "送餐地址太短了,不能辨识",
        },
        {
          name: "use_phone",
          placeholder: "请填写能够联系到您的手机号",
          data: "",
          confirm: true,
          err: "请输入正确的手机号",
        },
      ],
      canSubmit: false,
    };
  },
  computed: {
    inputsChage() {
      return JSON.parse(JSON.stringify(this.inputs));
    },
  },
  watch: {
    inputsChage: {
      deep: true,
      handler(newV, oldV) {
        // 第一次循环 只是用于区分数据是否改变 并决定是否该展示错误提示
        for (let i = 0; i < newV.length; i++) {
          if (newV[i].data !== oldV[i].data) {
            // 判断是否是数据改变
            // 根据不同的属性名 走不同的逻辑判断
            let name = newV[i].name;
            let data = newV[i].data;
            if (name === "recive_name") {
              // 收货人姓名改变
              if (data === "") {
                this.inputs[i].confirm = false;
                break;
              } else this.inputs[i].confirm = true;
              //由于每一次只会变一个 后续没必要走 跳过 节省性能
              break;
            } else if (name === "recive_area_detail") {
              if (data.length === 0) {
                this.inputs[i].err = "请详细填写送餐地址";
                this.inputs[i].confirm = false;

                break;
              } else if (data.length < 3) {
                this.inputs[i].err = "送餐地址太短不能辨识";
                this.inputs[i].confirm = false;

                break;
              } else {
                this.inputs[i].confirm = true;
              }
            } else if (name === "use_phone") {
              let re =
                /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
              if (data.length === 0) {
                this.inputs[i].err = "手机号不能为空";
                this.inputs[i].confirm = false;

                break;
              } else if (data.match(re) === null) {
                this.inputs[i].err = "请输入正确的手机号";
                this.inputs[i].confirm = false;
                break;
              } else {
                this.inputs[i].confirm = true;
              }
            }
          } else continue;
        }
      },
    },
  },
  methods: {
    toSubmit() {
      try {
        this.inputs.forEach((item) => {
          if (item.data === "") {
            this.canSubmit = false;
            throw new Error("G!");
          } else if (item.confirm) {
            this.canSubmit = true;
          } else {
            this.canSubmit = false;
            throw new Error("G!");
          }
        });
      } catch (error) {
        console.log("忽略我 没用", error);
      }
      if (this.canSubmit) {
        let data = {};
        this.inputs.forEach((item) => {
          data[item.name] = item.data;
        });
        let vuexData = this.$store.state.chageRecive.address;

        let flag = true;

        vuexData.forEach((obj) => {
          if (
            obj.recive_area === data.recive_area &&
            obj.recive_area_detail === data.recive_area_detail
          ) {
            //两个都相同就G
            flag = false;
          }
        });

        if (flag) {
          // 发送ajax请求给后台让他插入数据
          this.$axios
            .post("user/addAddress", data)
            .then((result) => {
              if (result.data.status === 200) {
                // this.$router.push({
                //   path: "/chageRecAddress",
                // });
                this.$router.go(-1);
              } else {
                this.$message({
                  type: "error",
                  message: "出错",
                });
              }
            })
            .catch((err) => {
              console.log(err);
              this.$message({
                type: "error",
                message: "出错",
              });
            });
        }else{
          this.$message({
            type:'error',
            message:'不能设置相同的地址'
          });
        }
      } else {
        this.$message({
          type: "error",
          message: "请求确保输入合法！",
        });
      }
    },
    getAddress() {
      this.$router.push({
        name: "searchAddress",
      });
    },
    // 这个函数。。。用于防止报错 不管
    unless() {},
    // 用于created时修改inputs数组
    initInputs() {
      let newAddress = this.$store.state.chageRecive.newAddress;
      if (newAddress.length !== 0) {
        let newArr = [];
        this.inputs.forEach((item) => {
          if (item.name === "recive_area") {
            item.data = newAddress.name;
          }
          newArr.push(item);
        });
        this.inputs = newArr;
      }
    },
  },
  created() {
    // 去读取vuex 中的newAddress 看看是否存在数据 存在就改变一下inputs数组
    this.initInputs();
  },
};
</script>

<style lang="less" scoped>
#addNewAddress {
  & > .el-header {
    padding: 0;
    margin: 0;
    height: auto !important;
  }
  & > .el-main {
    padding: 0;
    margin: 0;
    @top: 20px;
    @width: 90%;
    & > div.inputs {
      background-color: white;
      margin-top: 30px;
      padding-bottom: @top;
      & > div.input {
        display: block;
        margin: 0 auto;
        width: @width;
        margin-top: @top;
        & > input {
          display: block;
          width: 100%;
          font-size: 35px;
          outline: none;
          border: none;
          padding: 14px;
          box-sizing: border-box;
          background-color: #f2f2f2;
          color: #333;
        }
        & > span {
          display: block;
          color: red;
          font-size: 20px;
          padding-top: 10px;
        }
      }
    }
    & > .el-button {
      display: block;
      width: @width;
      font-size: 50px;
      margin: 0 auto;
      margin-top: 50px;
    }
  }
}
.clearfix::after,
.clearfix::before {
  display: table;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}
</style>