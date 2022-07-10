<!--
 * 作者：Hyhello
 * 时间：2022-07-03
 * 描述：备品备件信息
-->
<style lang="scss" scoped>
  @include B(home) {
    @include E(spares-main) {
      height: 420px;
      overflow: hidden;
      position: relative;
      z-index: 0;
      @include flex(stretch, column nowrap);
      &::before,
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
      }
      &::after {
        background: rgba(#000d17, 0.8);
        filter: blur(10px);
        -webkit-filter: blur(10px);
        background-attachment: fixed;
      }
      &::before {
        background: url('../../../assets/images/home_bar_line.png') no-repeat center calc(100% + 6px);
      }
    }
    @include E(spares-nav) {
      padding: 0 10px;
      padding-bottom: 10px;
    }
    @include E(spares-body) {
      flex: 1;
      padding: 0 10px;
      overflow: auto;
      @include E(spares-li) {
        @include flex(flex-start, row nowrap);
        & + & {
          margin-top: 10px;
        }
        @include E(spares-box) {
          flex: 1;
          padding: 10px;
          position: relative;
          z-index: 0;
          & + & {
            margin-left: 10px;
          }
          @include E(spares-bg) {
            width: 100%;
            height: 100%;
            position: absolute;
            z-index: -1;
            left: 0;
            top: 0;
            background: rgba(#032460, 0.15);
            border: 1px solid rgba(255, 255, 255, 0.05);
            filter: blur(10edpx);
          }
          @include E(spares-title) {
            margin-bottom: 5px;
            > img {
              width: 18px;
              margin-right: 5px;
            }
          }
        }
      }
      ::v-deep .hy-cell {
        padding: 4px 0;
      }
    }
  }
</style>
<template>
  <CardBox custom-bg title="备品备件信息" :icon-style="{ borderLeftColor: '#FF7738' }">
    <div class="hy-home__spares-main">
      <div class="hy-home__spares-nav">
        <TabGroup v-model="tabValue">
          <TabItem v-for="(item, index) in tabList" :key="index" :value="item.value">{{ item.label }}</TabItem>
        </TabGroup>
      </div>
      <div class="hy-home__spares-body">
        <div class="hy-home__spares-li">
          <div class="hy-home__spares-box">
            <div class="hy-home__spares-bg"></div>
            <div class="hy-home__spares-title">
              <img src="../../../assets/images/home_spares_icon.png" alt="icon" />
              D-9999-999999
            </div>
            <div class="hy-home__spares-content">
              <Cell label-width="65" title="物料编号:">D-9999-999999</Cell>
              <Cell label-width="65" title="设备名称:">D-9999-999999</Cell>
              <Cell label-width="65" title="数量:">D-9999-999999</Cell>
              <Cell label-width="65" title="人员:">D-9999-999999</Cell>
              <Cell label-width="65" title="时间:">D-9999-999999</Cell>
            </div>
          </div>
          <div class="hy-home__spares-box">
            <div class="hy-home__spares-bg"></div>
            <div class="hy-home__spares-title">
              <img src="../../../assets/images/home_spares_icon.png" alt="icon" />
              D-9999-999999
            </div>
            <div class="hy-home__spares-content">
              <Cell label-width="65" title="物料编号:">D-9999-999999</Cell>
              <Cell label-width="65" title="设备名称:">D-9999-999999</Cell>
              <Cell label-width="65" title="数量:">D-9999-999999</Cell>
              <Cell label-width="65" title="人员:">D-9999-999999</Cell>
              <Cell label-width="65" title="时间:">D-9999-999999</Cell>
            </div>
          </div>
        </div>
        <div class="hy-home__spares-li">
          <div class="hy-home__spares-box">
            <div class="hy-home__spares-bg"></div>
            <div class="hy-home__spares-title">
              <img src="../../../assets/images/home_spares_icon.png" alt="icon" />
              D-9999-999999
            </div>
            <div class="hy-home__spares-content">
              <Cell label-width="65" title="物料编号:">D-9999-999999</Cell>
              <Cell label-width="65" title="设备名称:">D-9999-999999</Cell>
              <Cell label-width="65" title="数量:">D-9999-999999</Cell>
              <Cell label-width="65" title="人员:">D-9999-999999</Cell>
              <Cell label-width="65" title="时间:">D-9999-999999</Cell>
            </div>
          </div>
          <div class="hy-home__spares-box">
            <div class="hy-home__spares-bg"></div>
            <div class="hy-home__spares-title">
              <img src="../../../assets/images/home_spares_icon.png" alt="icon" />
              D-9999-999999
            </div>
            <div class="hy-home__spares-content">
              <Cell label-width="65" title="物料编号:">D-9999-999999</Cell>
              <Cell label-width="65" title="设备名称:">D-9999-999999</Cell>
              <Cell label-width="65" title="数量:">D-9999-999999</Cell>
              <Cell label-width="65" title="人员:">D-9999-999999</Cell>
              <Cell label-width="65" title="时间:">D-9999-999999</Cell>
            </div>
          </div>
        </div>
      </div>
    </div>
  </CardBox>
</template>
<script>
  import { tabList } from '../const';
  import Cell from '@/components/Cell.vue';
  import CardBox from '@/components/CardBox.vue';
  import { TabGroup, TabItem } from '@/components/tab';
  export default {
    name: 'Spares',
    components: { Cell, CardBox, TabGroup, TabItem },
    data() {
      return {
        tabList,
        tabValue: 1
      };
    }
  };
</script>
