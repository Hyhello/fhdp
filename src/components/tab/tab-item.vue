<!--
 * 作者：Hyhello
 * 时间：2022-06-30
 * 描述：tab-item
-->
<style lang="scss" scoped>
  $global-default-color: #343d4e;
  $global-highlight-color: #1459fa;
  .hy-tab {
    .hy-tab__item {
      font-size: 12px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #cce8ff;
      padding: 5px 12px;
      line-height: 1;
      cursor: pointer;
      position: relative;
      display: inline-block;
      transition: color 0.3s;
      &::after {
        content: '';
        display: block;
        width: 18px;
        height: 16px;
        position: absolute;
        top: 100%;
        left: 50%;
        opacity: 0;
        margin-top: -5px;
        transform: translateX(-50%);
        background: url('../../assets/images/range.png') no-repeat center center;
      }
      margin-left: 10px;
      &:first-child {
        margin-left: 0;
      }
      &:hover {
        background: rgba(#1395ff, 0.1);
      }
      &.is-active {
        background: rgba(#1395ff, 0.1);
        &::after {
          opacity: 1;
        }
      }
    }
  }
</style>
<template>
  <span class="hy-tab__item" :class="{ 'is-active': checked }" @click="tagToggle">
    <slot>{{ label }}</slot>
  </span>
</template>
<script>
  export default {
    name: 'TabItem',
    props: {
      // eslint-disable-next-line vue/require-default-prop
      label: {
        type: [String, Number]
      },
      // eslint-disable-next-line vue/require-default-prop
      value: {
        type: [String, Number]
      }
    },
    inject: ['TabGroup'],
    computed: {
      checked() {
        return this.TabGroup.currentValue === this.value;
      }
    },
    methods: {
      tagToggle() {
        this.TabGroup.$emit('tag-click', this.value);
      }
    }
  };
</script>
