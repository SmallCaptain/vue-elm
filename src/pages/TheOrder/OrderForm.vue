<template>
    <div id="OrderForm">
        <div class="OrderFormContent">
            <div class="message">
                <span class="title">待支付</span>
                <span class="price">￥123</span>
            </div>
            <div class="orderBtn">
                <span>确定下单</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'OrderForm'
}
</script>

<style lang="less" scoped>
div#OrderForm{
    & > div.OrderFormContent{
        display: flex;
        span{
            color: #fff;
            font-size: 32px;
        }
        & > div.message{
            flex: 5;
            background-color: #3C3C3C;
            padding: 33px;
        }
        & > div.orderBtn{
            flex: 2;
            background-color: #50D372;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}
</style>