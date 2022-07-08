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
</style>
<template>
  <div class="hy-home">
    <!-- 全部产线 -->
    <!-- <Total></Total> -->
    <!-- 中间部分 -->
    <Three></Three>
    <div class="hy-home__right">
      <!-- 设备维保信息 -->
      <!-- <Device class="mb30"></Device> -->
      <!-- 备品备件信息 -->
      <!-- <Spares></Spares> -->
    </div>
  </div>
</template>
<script>
  import * as childs from './src';
  export default {
    name: 'Home',
    components: { ...childs }
  };
</script>
