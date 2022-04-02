<template>
  <li id="Address" @click="select">
    <!-- 内容区 -->
    <div class="content">
      <!--选择按钮-->
      <div class="btn" >
        <button
          :class="{ selected: index === currentIndex }"
          class="btn"
        ></button>
      </div>
      <!-- 详细信息 -->
      <div class="msg">
        <div class="msgContent">
          <!-- 收货具体地址 -->
          <div class="detail">{{ item.recive_area_detail }}</div>
          <!-- 名称联系方式 -->
          <div class="person">
            <div class="name">{{ item.recive_name }}</div>
            <div class="phone">{{ item.use_phone }}</div>
          </div>
        </div>
      </div>
      <!-- 修改地址信息图标 -->
      <div class="chage" @click.stop="chageAddressMsg">
        <icon-svg
          iconClass="cangpeitubiao_xiugaixiugaiziliao"
          iconStyle="iconStyle"
        />
      </div>
    </div>
  </li>
</template>

<script>
import iconSvg from "../../../components/iconSvg.vue";

export default {
  name: "AddressItem",
  components: {
    iconSvg,
  },
  props: {
    item: {
      type: Object,
    },
    index: {
      type: Number,
      default() {
        return 0;
      },
    },
    currentIndex: {
      type: Number,
      default() {
        return 0;
      },
    },
  },
  methods: {
    select() {
      this.$emit("chageSelect", this.index);
    },
    chageAddressMsg() {
      this.$router.push({
        name: "receiveAdressChage",
      });
    },
  },
};
</script>

<style lang="less" scoped>
li#Address {
  padding: 50px 0;

  & > div.content {
    display: flex;

    & > div.btn {
      flex: 1;
      display: flex;
      align-items: center;
      & > button {
        display: block;
        padding: 0;
        width: 34px;
        height: 34px;
        margin: 0 40px 0 0;
        box-sizing: content-box;
        outline: none;
        outline: 2px solid #01b6fd;
        border: 13px solid white;
        border-radius: 100%;
      }
    }
    & > div.msg {
      flex: 8;
      & > div.msgContent {
        & > div.detail {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 32px;
        }
        & > div.person {
          display: flex;
          font-size: 32px;
          color: #999999;

          & > div.name {
            margin-right: 20px;
          }
        }
      }
    }
    & > div.chage {
      display: flex;
      align-items: center;
    }
  }
}
.iconStyle {
  width: 32px;
  height: 32px;
}
.selected {
  background-color: #01b6fd;
}
</style>