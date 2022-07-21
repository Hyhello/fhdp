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
      @include E(tooltip) {
        position: absolute;
        z-index: 2000;
        width: 400px;
        left: 0;
        top: 0;
        @include E(tooltip-header) {
          font-size: 14px;
          padding: 10px;
          font-family: PingFang SC-Semibold, PingFang SC;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 10px;

          background-color: #000f46;
          border: 1px solid #263363;
          @include E(tooltip-icon) {
            width: 0;
            height: 0;
            display: inline-block;
            vertical-align: 1px;
            border: 4px solid transparent;
            border-left: 5px solid #ff7738;
            @include when(turn) {
              transform: rotate(180deg);
            }
          }
        }
        @include E(tooltip-body) {
          padding: 10px;
          border: 1px solid #263363;
          background-color: #000f46;
        }
      }
    }
  }
</style>
<template>
  <div class="hy-home__three">
    <transition name="hy-fade">
      <div class="hy-home__tooltip" v-show="visible" :style="posStyle">
        <div class="hy-home__tooltip-header">
          <span class="hy-home__tooltip-icon"></span>
          {{ title }}
        </div>
        <div class="hy-home__tooltip-body">
          <Cell label-width="100px" title="设备生产状态：">设备生产状态</Cell>
          <Cell title="设备型号：">设备型号</Cell>
          <Cell title="设备型号：">设备型号</Cell>
          <Cell title="履历：">履历</Cell>
          <Cell title="加工能力：">加工能力</Cell>
          <Cell title="点检保养：">点检保养</Cell>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import Graph from './graph';
  import Cell from '@/components/Cell.vue';

  export default {
    name: 'Three',
    components: { Cell },
    data() {
      return {
        visible: false,
        title: '',
        posStyle: {
          left: 0,
          top: 0
        }
      };
    },
    mounted() {
      this.$nextTick(() => {
        const self = this;
        this.graph = new Graph(this.$el, {
          handleClick(ev, pos) {
            if (!ev) {
              self.visible = false;
            } else {
              self.posStyle.left = pos.clientX + 'px';
              self.posStyle.top = pos.clientY + 'px';
              self.title = ev.parent.name;
              self.visible = true;
            }
          },
          done() {
            self.$parent.animate = true;
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
