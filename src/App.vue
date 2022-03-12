<template>
  <transition name="fade">
    <router-view> </router-view>
  </transition>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="less" scoped>
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
.fade-leave-active,
.fade-enter-active {
  transition: all 1s;
}
.fade-leave-active {
  display: none;
}
</style>