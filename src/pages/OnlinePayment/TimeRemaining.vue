<template>
  <div id="TimeRemaining">
    <div class="TimeRemainingContent">
      <div class="title">
        <span>支付剩余时间</span>
      </div>
      <div class="time">
        <span class="hour">00</span>
        <span class="split">:</span>
        <span class="minute">{{ minute }}</span>
        <span class="split">:</span>
        <span class="second">{{ second }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TimeRemaining",
  data() {
    return {
      time: (15*60*1000),
      hour: "00",
      minute: "00",
      second: "00",
    };
  },
  methods: {
    createTimer() {
      let timer = setInterval(() => {
        let min = Math.floor(this.time / (6 * 10000));
        let second = (this.time % (6 * 10000)) / 1000;
        if (this.time >= 0) {
          this.minute = min < 10 ? "0" + `${min}` : `${min}`;
          this.second = second < 10 ? "0" + `${second}` : `${second}`;
        }

        if (this.time < 0) {
          clearInterval(this.timer);
          confirm('支付超时');
          this.$router.go(-1);
        }
        this.time -= 1000;
        //一秒减一千
      }, 1000);

      this.timer = timer;
    },
  },
  mounted() {
    //   创建计时器
    this.createTimer();
  },
  beforeDestroy(){
    clearInterval(this.timer);
  }
  // watch:{
  //     time(newvalue){
  //         if (newvalue < 0) {
  //           confirm('支付超时');
  //           this.$router.go(-1);
  //         }
  //     }
  // }
};
</script>

<style lang="less" scoped>
div#TimeRemaining {
  padding: 33px;
  background-color: #fff;

  & > div.TimeRemainingContent {
    height: 230px;
    display: flex;
    align-items: center;
    flex-direction: column;
    & > div.title {
      margin-top: 46px;
      & > span {
        font-size: 28px;
        color: #333;
      }
    }
    & > div.time {
      margin-top: 24px;
      & > span {
        font-size: 70px;
        color: #333;
        font-weight: 700;
      }
      & > span.split {
        margin: 0 19px;
      }
    }
  }
}
</style>