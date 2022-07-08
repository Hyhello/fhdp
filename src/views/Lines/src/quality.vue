<!--
 * 作者：Hyhello
 * 时间：2022-06-30
 * 描述：质量问题分布
-->
<style lang="scss" scoped>
  @include B(line) {
    @include E(quality) {
      width: 460px;
      @include E(graph) {
        height: 333px;
        z-index: 0;
        position: relative;
        background-color: #051a49;
        @include flex(stretch, column nowrap);
        &::after {
          content: '';
          z-index: -1;
          position: absolute;
          height: 15px;
          width: 100%;
          bottom: 0;
          left: 0;
          box-sizing: border-box;
          margin: 0 -7px -7px 0;
          background-image: url('../../../assets/images/quality_bg.png');
          background-repeat: no-repeat;
          background-position: center bottom;
          background-size: cover;
        }
      }
      @include E(pie) {
        flex: 1;
        background: url('../../../assets/images/quality_pie_bg.png') no-repeat center 70%;
      }
      @include E(legend) {
        margin-bottom: 30px;
        @include flex(center, row wrap);
        @include E(legend-li) {
          width: 50%;
          flex: 1;
          height: 45px;
          line-height: 45px;
          flex-basis: 50%;
          font-size: 14px;
          padding-left: 36px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #e6ffff;
          @include E(legend-icon) {
            width: 8px;
            height: 30px;
            overflow: hidden;
            position: relative;
            display: inline-block;
            vertical-align: -1px;
            @include E(legend-inner) {
              position: absolute;
              left: 0;
              bottom: 0;
              width: 100%;
              border-radius: 8px;
              // &.Q1 {
              //   background: linear-gradient(180deg, #1395ff 0%, #24deff 100%);
              // }
              // &.Q2 {
              //   background: linear-gradient(180deg, #fed23c 0%, #feb50c 100%);
              // }
              // &.Q3 {
              //   background: linear-gradient(180deg, #53ffff 0%, #4efeea 100%);
              // }
              // &.Q4 {
              //   background: linear-gradient(180deg, #87ce50 0%, #b6dd38 100%);
              // }
            }
          }
          @include E(legend-title) {
            display: inline-block;
            width: 40px;
            margin: 0 25px 0 10px;
          }
        }
      }
    }
  }
</style>
<template>
  <CardBox class="hy-line__quality" custom-bg title="质量问题分布">
    <div class="hy-line__graph">
      <div class="hy-line__pie">
        <ECharts type="pie" :options="options"></ECharts>
      </div>
      <div class="hy-line__legend">
        <div class="hy-line__legend-li" v-for="(item, index) in legendData" :key="index">
          <span class="hy-line__legend-icon">
            <span class="hy-line__legend-inner" :style="calcStyle(item)"></span>
          </span>
          <span class="hy-line__legend-title">{{ item.name }}</span>
          <span class="hy-line__legend-value">
            <span :style="{ color: item.itemStyle.color }">{{ item.value }}</span>
            起
          </span>
        </div>
      </div>
    </div>
  </CardBox>
</template>
<script>
  import 'echarts-gl';
  import { qualityFn } from './echartOptions';
  import CardBox from '@/components/CardBox.vue';
  import ECharts from '@/components/ECharts/index.vue';

  const data = [
    {
      name: '问题A',
      value: 60,
      itemStyle: {
        color: '#3FA9F5'
      }
    },
    {
      name: '问题C',
      value: 45,
      itemStyle: {
        color: '#FFC21E'
      }
    },
    {
      name: '问题B',
      value: 50,
      itemStyle: {
        color: '#00FFFF'
      }
    },
    {
      name: '其他',
      value: 40,
      itemStyle: {
        color: '#AED91C'
      }
    }
  ];

  const total = data.reduce((total, item) => (total += item.value), 0);

  export default {
    name: 'Quality',
    components: { CardBox, ECharts },
    data() {
      return {
        legendData: data,
        options: qualityFn(data)
      };
    },
    methods: {
      calcStyle(row) {
        return { backgroundColor: row.itemStyle.color, height: (row.value * 100) / total + 20 + '%' };
      }
    }
  };
</script>
