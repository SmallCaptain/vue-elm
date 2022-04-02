<template>
  <!-- 用于确认是否更改收货地址 -->
  <div id="SureAddress" @click="toChageRecive">
    <div class="SureAddressContent">
      <div class="posIcon">
        <icon-svg iconClass="dingwei" iconStyle="posIcon" />
      </div>
      <div class="msg">
        <div class="reciveMsg">
          <span class="name">
            <span class="firstName">{{ getFirstName }}</span>
            <span class="lastName">{{ getLastName }}</span>
          </span>
          <span class="phone">{{ address.usephone }}</span>
        </div>
        <div class="address">
          <span class="address">{{ address.recive_area_detail }}</span>
        </div>
      </div>
      <div class="arrow">
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
import iconSvg from "../../components/iconSvg.vue";
export default {
  components: { iconSvg },
  name: "SureAddress",
  props: {
    address: {
      type: Object,
      default() {
        return {
          recive_area: "",
          recive_area_detail: "",
          usephone: "",
          recive_name: "无",
        };
      },
    },
  },
  computed: {
    getFirstName() {
      let firstName = "无";
      if (this.address.recive_name !== undefined)
        firstName = this.address.recive_name[0];
      return firstName;
    },
    getLastName() {
      let lastName = "";
      if (this.address.recive_name !== undefined) {
        let length = this.address.recive_name.length;
        let fullname = this.address.recive_name.split("");
        lastName = fullname.splice(1, length - 1).join("");
      }

      return lastName;
    },
  },
  methods: {
    toChageRecive() {
      this.$emit("chageAddressShow");
    },
  },
};
</script>

<style lang="less" scoped>
div#SureAddress {
  background-image: url(../../images/confirm1.png);
  background-repeat: repeat-x;
  background-position: 0 bottom;
  background-color: #fff;

  & > div.SureAddressContent {
    height: 150px;
    display: flex;
    & > div {
      height: 100%;

      span {
        font-size: 25px;
        color: #333;
      }
    }
    & > div.posIcon {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    & > div.msg {
      flex: 8;
      display: flex;
      flex-direction: column;
      justify-content: center;
      & > div.reciveMsg {
        & > span.name {
          & > span.firstName {
            font-size: 35px;
            font-weight: bold;
          }
          & > span.lastName {
            color: #666;
            margin: 0 10px;
          }
        }
        & > span.phone {
          font-weight: bold;
        }
      }
      & > div.address {
        & > span.address {
          color: #666;
        }
      }
    }
    & > div.arrow {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      & > i {
        font-size: 24px;
        font-weight: bold;
        color: #666;
      }
    }
  }
}
.posIcon {
  width: 50px;
  height: 50px;
}
</style>