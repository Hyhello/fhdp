<!--
 * 作者：Hyhello
 * 时间：2022-07-01
 * 描述：订单达成情况
-->
<style lang="scss" scoped>
  @include B(line) {
    @include E(graph) {
      height: 310px;
      padding: 0 7px 7px;
      margin: 0 -7px -7px;
      background: url('../../../assets/images/reach_bg.png') no-repeat center 0;
      background-size: 100% 100%;
    }
  }
</style>
<template>
  <CardBox class="hy-line__reach" custom-bg title="订单达成情况">
    <div class="hy-line__graph">
      <ECharts type="bar" :options="options"></ECharts>
    </div>
  </CardBox>
</template>
<script>
  import { reachFn } from './echartOptions';
  import CardBox from '@/components/CardBox.vue';
  import ECharts from '@/components/ECharts/index.vue';

  export default {
    name: 'Reach',
    components: { CardBox, ECharts },
    data() {
      return {
        options: reachFn()
      };
    }
  };
</script>
