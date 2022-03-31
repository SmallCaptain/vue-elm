<template>
  <!-- 支付方式组件 -->
  <div id="PayWay">
      <div class="PayWayContent">
          <div class="pay">
              <span class="title">支付方式</span>
              <span class="name">
                  <span class="nowPay">在线支付</span>
                  <span class="arrow">
                      <i class="el-icon-arrow-right"></i>
                  </span>
              </span>
          </div>
          <div class="redpacket">
              <span class="title">红包</span>
              <span class="methion">暂时只在饿了么APP中支持</span>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name:'payWay'
}
</script>

<style lang="less" scoped>
div#PayWay{
    padding: 15px;
    background-color: #fff;
    padding-left: 33px;

    & > div.PayWayContent{
        & > div{
            height: 90px;
        }
        & > div.pay{
            display: flex;
            justify-content: space-between;
            border-bottom: 3px solid #F9F9F9;
            & > span.title{
                font-size: 28px;
                color: #333;
                line-height: 90px;
            }
            & > span.name{
                font-size: 24px;
                color: #666;
                line-height: 90px;

                & > span.arrow{
                    margin-left: 16px;
                }
            }
        }
        & > div.redpacket{
            display: flex;
            justify-content: space-between;

            & > span{
                line-height: 90px;
            }
            & > span.title{
                font-size: 25px;
                color: #666;
            }
            & > span.methion{
                font-size: 26px;
                color: #666;
            }
        }
    }
}
</style>