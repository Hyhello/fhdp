<!--
 * 作者：hyhello
 * 时间：2022-06-29
 * 描述：
-->
<style lang="scss" scoped>
  @include B(home) {
    @include E(three) {
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 1;
      left: 0;
      top: 0;
    }
  }
</style>
<template>
  <div class="hy-home__three"></div>
</template>
<script>
  import Graph from './graph';
  export default {
    name: 'Three',
    mounted() {
      this.$nextTick(() => {
        this.graph = new Graph(this.$el, {
          handleClick(ev) {
            alert(`您点击的是：${ev.parent.name}`);
          }
        });
        this.graph.render();
      });
    },
    beforeDestroy() {
      if (this.graph) {
        this.graph.destroy();
        this.graph = null;
      }
    }
  };
</script>
