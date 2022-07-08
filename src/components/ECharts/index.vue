<!--
 * 作者：Hyhello
 * 时间：2022-06-30
 * 描述：Echarts
-->
<template>
  <div :role="type" class="echarts-panel">
    <div ref="echarts" class="echarts-main"></div>
  </div>
</template>
<script>
  import echarts from 'echarts';
  import { debounce } from '@hyhello/utils';
  import { addResizeListener, removeResizeListener } from './resizeEvent';

  // 事件句柄
  const eventList = [
    'click',
    'dblclick',
    'mousedown',
    'mousemove',
    'mouseup',
    'mouseover',
    'mouseout',
    'globalout',
    'contextmenu'
  ];

  export default {
    name: 'ECharts',
    registerMap(name, json) {
      echarts.registerMap(name, json);
    },
    props: {
      options: {
        type: Object,
        default() {
          return {};
        }
      },
      theme: {
        type: Object,
        default() {
          return {};
        }
      },
      resizeAble: {
        type: Boolean,
        default: true
      },
      // 是否使用echarts-gl， 启用gl会取消options: deep:true 设置，因为在globe情况下会出现setOptions递归， 造成卡顿
      useGl: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        required: true
      }
    },
    watch: {
      theme: {
        deep: true,
        handler() {
          this.setTheme();
        }
      }
    },
    created() {
      this._initOptionsWatcher();
    },
    mounted() {
      this._initCharts();
    },
    beforeDestroy() {
      this.destroyMap();
      this.$el && this.$el.remove();
    },
    methods: {
      _initCharts() {
        this.$nextTick(() => {
          const el = this.$refs.echarts;
          this._echarts = echarts.init(el, this.theme);
          this.setOption(this.options);
          eventList.forEach((type) => {
            this._echarts.on(type, (e) => {
              this.$emit(type, e);
            });
          });
          if (this.resizeAble) {
            this.__outSideResize__ = debounce(this.resize, 100);
            addResizeListener(el, this.__outSideResize__);
          }
        });
      },
      // 初始化watch
      _initOptionsWatcher() {
        this.$watch(
          'options',
          (val, oldVal) => {
            this.setOption(val, val !== oldVal);
          },
          {
            deep: !this.useGl
          }
        );
      },
      // 默认不合并
      setOption(val, notMerge = true) {
        if (!this._echarts) return;
        this._echarts.clear();
        this._echarts.setOption(val, notMerge);
      },
      // 地图resize
      resize() {
        if (!this._echarts) return;
        this._echarts.resize();
        this.$emit('resize');
      },
      // 销毁地图
      destroyMap() {
        if (!this._echarts) return;
        if (this.resizeAble) {
          removeResizeListener(this.$refs.echarts, this.__outSideResize__);
          this.__outSideResize__ = null;
        }
        // 地图清空
        this._echarts.clear();
        // 地图销毁
        this._echarts.dispose();
        this._echarts = null;
      },
      // 由于echarts 3.0 不支持setTheme 导致
      setTheme() {
        this.destroyMap();
        this._initCharts();
      }
    }
  };
</script>
<style lang="scss" scoped>
  .echarts-panel {
    width: 100%;
    height: 100%;
    user-select: none;
    position: relative;
    .echarts-main {
      width: 100%;
      height: 100%;
    }
  }
</style>
