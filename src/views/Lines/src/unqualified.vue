<!--
 * 作者：Hyhello
 * 时间：2022-07-01
 * 描述：不合格率指标
-->
<style lang="scss" scoped>
  @include B(line) {
    @include E(unqualified) {
      width: 100%;
      @include E(graph) {
        height: 340px;
        padding: 0 7px 7px;
        margin: 0 -7px -7px;
        background: url('../../../assets/images/unqualified_bg.png') no-repeat center 0;
        background-size: 100%;
        @include flex(stretch, row nowrap);
        @include E(li) {
          flex: 1;
          background: url('../../../assets/images/unqualified_pie_bg.png') no-repeat center -75px;
          background-size: 100%;
          @include E(box) {
            @include flex(center, column nowrap);
            @include E(pie) {
              margin-top: 50px;
              width: 270px;
              height: 226px;
            }
            @include E(title) {
              font-size: 14px;
              font-family: PingFang SC-Regular, PingFang SC;
              font-weight: 400;
              color: #e6ffff;
              > span {
                color: #a8c1ce;
              }
            }
          }
        }
      }
    }
  }
</style>
<template>
  <CardBox class="hy-line__unqualified" custom-bg title="不合格率指标">
    <div class="hy-line__graph">
      <div class="hy-line__li">
        <div class="hy-line__box">
          <div class="hy-line__pie">
            <ECharts type="pie" :options="options1"></ECharts>
          </div>
          <div class="hy-line__title"><span>不合格数：</span>{{ info.TRISPIN || 7 }}</div>
        </div>
      </div>
      <div class="hy-line__li">
        <div class="hy-line__box">
          <div class="hy-line__pie">
            <ECharts type="pie" :options="options2"></ECharts>
          </div>
          <div class="hy-line__title"><span>不合格数：</span>{{ info.viscomAOIN || 7 }}</div>
        </div>
      </div>
      <div class="hy-line__li">
        <div class="hy-line__box">
          <div class="hy-line__pie">
            <ECharts type="pie" :options="options3"></ECharts>
          </div>
          <div class="hy-line__title"><span>不合格数：</span>{{ info.TRIAOIN || 7 }}</div>
        </div>
      </div>
    </div>
  </CardBox>
</template>
<script>
  import CardBox from '@/components/CardBox.vue';
  import { unqualifiedFn } from './echartOptions';
  import ECharts from '@/components/ECharts/index.vue';
  export default {
    name: 'Unqualified',
    components: { CardBox, ECharts },
    inject: ['Lines'],
    data() {
      return {
        options1: unqualifiedFn(87, 'TRI SPI'),
        options2: unqualifiedFn(87, 'viscom AOI'),
        options3: unqualifiedFn(87, 'TRI AOI')
      };
    },
    watch: {
      info(val) {
        this.options1 = unqualifiedFn(val.TRISPIP, 'TRI SPI');
        this.options2 = unqualifiedFn(val.viscomAOIP, 'viscom AOI');
        this.options3 = unqualifiedFn(val.TRIAOIP, 'TRI AOI');
      }
    },
    computed: {
      info() {
        return this.Lines.info;
      }
    }
  };
</script>
