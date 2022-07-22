<!--
 * 作者：Hyhello
 * 时间：2022-06-30
 * 描述：首页
-->
<style lang="scss" scoped>
  @include B(home) {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    @include E(right) {
      position: absolute;
      width: 400px;
      top: 77px;
      right: 50px;
      z-index: 2;
    }
    .mb30 {
      margin-bottom: 20px;
    }
  }
  .fade-left-enter-active,
  .fade-left-leave-active {
    transition: all 1.2s;
  }
  .fade-left-enter,
  .fade-left-leave-to {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  .fade-right-enter-active,
  .fade-right-leave-active {
    transition: all 2.7s;
    .inner-1,
    .inner-2 {
      transition: all 1.2s;
    }
    .inner-1 {
      transition-delay: 0s;
    }
    .inner-2 {
      transition-delay: 0.3s;
    }
  }
  .fade-right-enter,
  .fade-right-leave-to {
    .inner-1,
    .inner-2 {
      opacity: 0;
      transform: translate3d(100%, 0, 0);
    }
  }
</style>
<template>
  <div class="hy-home">
    <!-- 全部产线 -->
    <transition name="fade-left">
      <Total v-show="animate"></Total>
    </transition>
    <!-- 中间部分 -->
    <Three></Three>
    <transition name="fade-right">
      <div class="hy-home__right" v-show="animate">
        <!-- 设备维保信息 -->
        <Device class="mb30 inner-1"></Device>
        <!-- 备品备件信息 -->
        <Spares class="inner-2"></Spares>
      </div>
    </transition>
  </div>
</template>
<script>
  import * as childs from './src';
  export default {
    name: 'Home',
    components: { ...childs },
    data() {
      return {
        animate: false
      };
    }
  };
</script>
