<template>
  <div id="ChageAddress">
    <transition name="popup">
      <div class="ChageAddressContent" v-show="show">
        <!-- title -->
        <div class="title">
          <!-- title -->
          <h4>选择收货地址</h4>
          <div class="turndown">
            <span @click="chageAddressShow">X</span>
          </div>
        </div>
        <ul ref="main" class="list">
          <li class="item">
            <AddressItem
              :index="index"
              :currentIndex="currentIndex"
              :item="item"
              v-for="(item, index) in reciveAddress"
              :key="index"
              @chageSelect="chageSelect"
            />
          </li>
        </ul>
        <!-- 无收货地址时的提示与操作 -->
        <div class="methion" v-show="reciveAddress.length === 0">
          <div class="methionContent">
            <div class="msg">暂无收货地址。。</div>
            <div @click="toAddress" class="addAddress">点我去新增地址</div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="fadein">
      <div
        v-if="show"
        class="zhezhao"
        @touchmove.prevent.stop
        @touchstart="touch"
      ></div>
    </transition>
  </div>
</template>

<script>
import AddressItem from "./AddressItem.vue";
export default {
  name: "ChageAddress",
  components: {
    AddressItem,
  },
  props: {
    show: {
      type: Boolean,
    },
    reciveAddress: {
      type: Array,
    },
  },
  data() {
    return {
      //特定选择的收货地址 默认为第一个
      currentIndex: 0,
    };
  },
  methods: {
    touch() {
      this.$emit("chageAddressShow");
    },
    chageAddressShow() {
      this.$emit("chageAddressShow");
    },
    chageSelect(index) {
      this.currentIndex = index;
      this.$emit("chageAddress", this.currentIndex);
    },
    toAddress() {
      this.$router.push({
        name: "receiveAdressChage",
      });
    },

  },


};
</script>

<style lang="less" scoped>
div#ChageAddress {
  & > div.ChageAddressContent {
    position: fixed;
    width: 100vw;
    height: 90vh;
    bottom: 0;
    background-color: #ffffff;
    padding: 0 40px;
    box-sizing: border-box;
    border: 1px solid transparent;
    border-top-right-radius: 50px;
    border-top-left-radius: 50px;
    z-index: 101;
    overflow: auto;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    &::-webkit-scrollbar {
      width: 0 !important;
      display: none;
    }
    & > div.title {
      display: flex;
      & > h4 {
        flex: 10;
        font-size: 40px;
        padding: 64px 0;
        margin: 0;
        text-align: center;
      }
      & > div.turndown {
        display: flex;

        align-items: center;
        & > span {
          font-size: 42px;
          color: #cbcac8;
        }
      }
    }
    & > ul.list {
      padding: 0;
      list-style: none;
    }
    & > div.methion {
      & > div.methionContent {
        display: flex;
        flex-direction: column;
        align-items: center;
        & > div {
          font-size: 32px;
          color: #666;
        }
        & > div.msg {
          margin-bottom: 20px;
        }
        & > div.addAddress {
          color: #3190e8;
        }
      }
    }
  }

  & > div.zhezhao {
    position: fixed;
    height: 100vh;
    width: 100vw;
    z-index: 100;
    background-color: rgba(165, 162, 162, 0.478);
    filter: blur(10px);
  }
}
.popup-enter-active {
  animation: popup 0.5s linear;
}
.popup-leave-active {
  animation: popup 0.5s linear reverse;
}
.fadein-enter-active {
  animation: fadein 0.5s linear;
}
.fadein-leave-active {
  animation: fadein 0.5s linear reverse;
}
@keyframes fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes popup {
  0% {
    opacity: 0.5;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>