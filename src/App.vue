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
.fade-enter-active {
  transition: all 0.5s;
}
.fade-leave-active {
  display: none;
  transition: all 0.5s;
}
</style>