<!--
 * 作者：Hyhello
 * 时间：2022-06-30
 * 描述：tab
-->
<style lang="scss" scoped>
  .hy-tab {
    padding: 10px 0;
    position: relative;
  }
</style>
<template>
  <div class="hy-tab" role="tabs">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'TabGroup',
    props: {
      // eslint-disable-next-line vue/require-default-prop
      value: {
        type: [String, Number]
      },
      gutter: {
        type: Number,
        default: 10
      }
    },
    data() {
      return {
        currentValue: this.value
      };
    },
    watch: {
      value(val) {
        this.currentValue = val;
      }
    },
    provide() {
      return {
        TabGroup: this
      };
    },
    mounted() {
      this.$on('tag-click', this.tagClick);
      this.$nextTick(() => {
        this.calcSpace();
      });
    },
    updated() {
      this.$nextTick(() => {
        this.calcSpace();
      });
    },
    beforeDestroy() {
      this.$off('tag-click', this.tagClick);
    },
    methods: {
      calcSpace() {
        const { gutter } = this;
        const childList = this.$children.filter((item) => item.$options.name === 'TabItem');
        childList.slice(1).forEach((component) => {
          component.$el.style.marginLeft = gutter + 'px';
        });
      },
      tagClick(val) {
        if (val === this.currentValue) return;
        this.currentValue = val;
        this.$emit('input', val);
        this.$emit('change', val);
      }
    }
  };
</script>
