<template>
  <div id="SendTime">
    <div class="SendTimeContent">
      <div class="sendTime">
        <span>送达时间</span>
      </div>
      <div class="sendMsg">
        <div class="time">尽快送达|预计时间{{merchant.shipping_time}}</div>
        <div v-if="merchant.is_hummingbird" class="isHumming">
          <span>蜂鸟专送</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SendTime",
  props:{
    merchant:{
      type:Object,
      default(){
        return {
          is_hummingbird:1,
          shipping_time:'15:00'
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
div#SendTime {
  border-left: 10px solid #298eeb;
  & > div.SendTimeContent {
    display: flex;
    background-color: #fff;
    height: 170px;
    padding: 15px;

    & > div.sendTime {
      display: flex;
      height: 100%;
      align-items: center;
      flex: 1;
      & > span {
        padding-left: 42px;
        font-size: 32px;
        font-weight: 700;
      }
    }
    & > div.sendMsg {
      height: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;

      & > div.time {
        font-size: 26px;
        display: flex;
        justify-content: flex-end;
        color: #298eeb;
        letter-spacing: 2px;
      }
      & > div.isHumming {
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
        & > span {
          display: inline-block;
          background-color: #298eeb;
          color: #fff;
          padding: 5px 10px;
          border-radius: 100px;
        }
      }
    }
  }
}
</style>