<!--
 * 作者：Hyhello
 * 时间：2022-06-30
 * 描述：cardBox
-->
<style lang="scss" scoped>
  @include B(cardbox) {
    color: #ffffff;
    @include E(header) {
      height: 40px;
      padding: 0 6px;
      margin-bottom: 4px;
      position: relative;
      @include flex(center, row nowrap);
      border-bottom: 1px solid rgba(#ffffff, 0.2);
      &::before,
      &::after {
        content: '';
        position: absolute;
        display: inline-block;
        width: 2px;
        height: 2px;
        top: 100%;
        background: rgba(#ffffff, 0.8);
        transform: translate(-50%, -50%);
      }
      &::before {
        left: 0;
      }
      &::after {
        left: 100%;
      }
      span {
        display: inline-block;
        vertical-align: middle;
      }
      @include E(title) {
        font-size: 14px;
        font-family: PingFang SC-Semibold, PingFang SC;
        font-weight: 600;
        color: #ffffff;
        @include E(triangle) {
          margin: 0 4px;
          border: 6px solid transparent;
          border-left: 6px solid #1395ff;
          @include when(turn) {
            transform: rotate(180deg);
          }
        }
      }
    }
    @include E(body) {
      padding: 10px;
      background: rgba(#000d17, 0.3) url('../assets/images/smt_lnt_bg_line.png') no-repeat center calc(100% + 6px);
      @include when(custom-bg) {
        padding: 0;
        background: none;
      }
    }
  }
</style>
<template>
  <div class="hy-cardbox">
    <div class="hy-cardbox__header">
      <div class="hy-cardbox__title">
        <span class="hy-cardbox__triangle" :style="iconStyle"></span>
        <span>{{ title }}</span>
      </div>
    </div>
    <div class="hy-cardbox__body" :class="{ 'is-custom-bg': customBg }">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'CardBox',
    props: {
      title: {
        type: String,
        default: ''
      },
      customBg: {
        type: [Boolean],
        default: false
      },
      iconStyle: {
        type: Object,
        default: () => ({})
      }
    }
  };
</script>
