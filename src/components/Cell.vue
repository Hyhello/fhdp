<!--
 * 作者：Hyhello
 * 时间：2022-06-30
 * 描述：Cell组件
-->
<style lang="scss" scoped>
  .hy-cell {
    padding: 5px 0;
    .hy-cell-heading {
      font-size: 12px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #cce8ff;
      text-align: left;
      vertical-align: middle;
      float: left;
      line-height: 1.5;
      color: #9398a1;
      padding-right: 10px;
      box-sizing: border-box;
      position: relative;
      &.has-icon {
        padding-left: 10px;
        &::after {
          content: '';
          width: 2px;
          height: 10px;
          position: absolute;
          top: 50%;
          left: 0;
          background: #1395ff;
          display: inline-block;
          transform: translateY(-50%);
        }
      }
    }

    .hy-cell-content {
      position: relative;
      font-size: 12px;
      font-family: PingFang SC-Semibold, PingFang SC;
      font-weight: 600;
      color: #a4c0de;
      line-height: 1.5;
      white-space: normal;
      word-break: break-all;
      text-align: right;
    }
  }
</style>
<template>
  <div class="hy-cell">
    <div v-if="width !== '0px'" class="hy-cell-heading" :class="{ 'has-icon': hasIcon }" :style="{ width: width }">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="hy-cell-content" :style="{ marginLeft: width }">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  import { maybeAddPx } from '@hyhello/utils';
  export default {
    name: 'Cell',
    props: {
      hasIcon: {
        type: Boolean,
        default: false
      },
      labelWidth: {
        type: [String, Number],
        default: '80px'
      },
      title: {
        type: [String, Number],
        default: ''
      },
      value: {
        type: [String, Number, Boolean],
        default: ''
      }
    },
    computed: {
      width() {
        return maybeAddPx(this.labelWidth);
      }
    }
  };
</script>
