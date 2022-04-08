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
.fade-enter-active {
  transition: all 0.5s;
  animation: fadeIn 0.5s linear;
}
.fade-leave-active {
  display: none;
}
@keyframes fadeIn {
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}
</style>