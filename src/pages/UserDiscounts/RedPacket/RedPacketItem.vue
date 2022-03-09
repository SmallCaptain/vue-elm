<template>
  <div id="RedPacketItem" v-if="this.redPacketItem.stale_dated===0">
    <div class="itemContain">
      <!-- 左边部分 金额+限定条件 -->
      <div class="left">
        <p class="amounts">
          <span class="unit">￥</span>
          <span class="int">{{ getInt }}</span>
          <span class="point">.</span>
          <span class="float">{{ getFlot }}</span>
        </p>
        <span>{{ this.redPacketItem.condiction }}</span>
      </div>
      <!-- 中间部分 分享红包等信息 -->
      <div class="middle">
        <div class="msg">
          <p class="type">{{ this.redPacketItem.type }}</p>
          <p class="deadTime">{{ this.redPacketItem.dead_time }}到期</p>
          <p class="usePhone">{{ this.redPacketItem.use_phone }}</p>
        </div>
      </div>
      <!-- 最右部分 剩余时间 -->
      <div class="right">
          剩{{this.redPacketItem.leav_time}}日
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RedPacketItem",
  props: {
    redPacketItem: {
      type: Object,
    },
  },
  computed: {
    getInt() {
      return Math.floor(this.redPacketItem.amounts);
    },
    getFlot() {
      let data = this.redPacketItem.amounts;
      let float = data.toString().split(".")[1];
      console.log(float);

      return float;
    },
  },
};
</script>

<style lang="less" scoped>
#RedPacketItem {
  height: 193px;
  background: white url(../../../images/hongbao.png) repeat-x;
  background-size: 5% 5%;
  border: 1px solid transparent;
  border-radius: 20px;
  padding: 0;
  margin-bottom: 25px;
  & > div.itemContain {
    display: flex;
    height: 110px;
    padding: 46px 23px 37px 23px;
    & > div.left {
      flex: 2;
      & > p.amounts {
        margin: 0;
        & > span {
          color: red;
          font-weight: bold;
        }
        & > span.unit {
          font-size: 30px;
        }
        & > span.int {
          font-size: 60px;
        }
        & > span.point {
          font-size: 50px;
        }
        & > span.float {
          font-size: 30px;
        }
      }
      & > span {
        display: block;
        font-size: 20px;
        color: #999;
      }
      border-right: 1px dotted #ccc;
    }
    & > div.middle {
      flex: 5;
      & > div.msg {
          padding-left: 50px;
        & > p {
          margin: 0;
        }
        & > p.type {
          color: #666;
          font-size: 32px;
        }
        & > p.deadTime {
          color: #999;
          font-size: 18px;
        }
        & > p.usePhone {
          color: #999;
          font-size: 18px;
        }
      }
    }
    & > div.right {
      flex: 2;
      font-size: 35px;
      color: red;
    }
  }
}
</style>