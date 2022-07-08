<style lang="scss" scoped>
  @include B(main) {
    position: relative;
    z-index: 0;
    background-color: #000d38;
    @include wh(1920px, 1080px);
    // 背景
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 20px;
      right: 20px;
      bottom: 20px;
      z-index: -1;
      background-image: url('../assets/images/main_bg.png');
      background-repeat: no-repeat;
      background-position: 0 center;
      background-size: 100% 100%;
    }
    @include E(header) {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 60px;
      @include E(logo) {
        position: absolute;
        left: 90px;
        top: 13px;
        width: 110px;
        height: 35px;
      }
      @include E(title) {
        width: 440px;
        font-size: 27px;
        line-height: 60px;
        text-align: center;
        margin: 0 auto;
        font-family: FZHanZhenGuangBiaoS-GB-Regular, FZHanZhenGuangBiaoS-GB;
        font-weight: 400;
        color: #ffffff;
        text-align: center;
      }
      @include E(extra) {
        position: absolute;
        right: 30px;
        top: 13px;
        font-family: Qanelas Soft DEMO-Medium, Qanelas Soft DEMO;
        @include flex(center, row nowrap);
        @include E(time) {
          font-size: 30px;
          font-weight: 200;
          color: #cccccc;
        }
        @include E(date) {
          margin-left: 15px;
          font-size: 12px;
          font-weight: 500;
          color: #cccccc;
        }
      }
    }
    @include E(body) {
      padding: 70px 50px 50px;
      @include wh(100%, 100%);
      @include when(fullbody) {
        padding: 0;
      }
    }
  }
</style>
<template>
  <div class="hy-main">
    <div class="hy-main__header">
      <img class="hy-main__logo" src="../assets/images/logo.png" alt="logo" />
      <SimpleUpload :disabled="EnableUpload" @output="handleOutput">
        <div class="hy-main__title">{{ metaInfo.title }}</div>
      </SimpleUpload>
      <div class="hy-main__extra">
        <DateTime class="hy-main__time" tag="span" formate="hh:mm"></DateTime>
        <div class="hy-main__date">
          <DateTime tag="div" :render-content="renderContent"></DateTime>
          <DateTime tag="div" formate="yyyy.MM.dd"></DateTime>
        </div>
      </div>
    </div>
    <div class="hy-main__body" :class="{ 'is-fullbody': !!metaInfo.isFullBody }">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  import DateTime from '@/components/DateTime';
  import SimpleUpload from '@/components/SimpleUpload';

  // 星期集合
  const weekList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  export default {
    name: 'Main',
    components: { DateTime, SimpleUpload },
    computed: {
      metaInfo() {
        return this.$route.meta || {};
      },
      EnableUpload() {
        return this.metaInfo.isFullBody;
      }
    },
    methods: {
      renderContent(h, date) {
        return weekList[date.getDay()].slice(0, 2);
      },
      // 输出结果
      handleOutput(res = []) {
        this.$bus.$emit(`xlsx-result`, res);
      }
    }
  };
</script>
