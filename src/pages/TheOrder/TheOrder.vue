<template>
    <el-container id="TheOrder">
        <el-header>
            <Header :fucName="fucName"></Header>
        </el-header>
        <el-main>

        </el-main>
    </el-container>
</template>

<script>
import Header from '../../components/Header.vue'
export default {
    name:'TheOrder',
    components:{
        Header
    },
    data() {
        return {
            fucName:'确定订单'
        }
    },
}
</script>

<style lang="less" scoped>
#TheOrder{
    & > .el-header{
        padding: 0;
        height: auto !important;
    }
}
</style>