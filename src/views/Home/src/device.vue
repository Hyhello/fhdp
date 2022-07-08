<!--
 * 作者：Hyhello
 * 时间：2022-07-03
 * 描述：设备维保信息
-->
<style lang="scss" scoped>
  @include B(home) {
    @include E(device-main) {
      position: relative;
      z-index: 0;
      height: 420px;
      overflow: hidden;
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
        background: rgba(#000d17, 0.2);
        filter: blur(10px);
        -webkit-filter: blur(10px);
        background-attachment: fixed;
      }
      &::before {
        background: url('../../../assets/images/home_bar_line.png') no-repeat center calc(100% + 6px);
      }
    }
    @include E(device-nav) {
      padding: 0 10px;
      padding-bottom: 10px;
    }
    @include E(device-body) {
      flex: 1;
      min-height: 0;
      padding: 0 0 20px 0;
      overflow: auto;
      overflow-x: hidden;
      @include E(device-li) {
        width: 100%;
        padding: 0 20px;
        @include flex(center, row nowrap);
        & + & {
          margin-top: 20px;
        }
        @include E(device-icon) {
          width: 84px;
          height: 80px;
          margin-right: 20px;
        }
        @include E(device-content) {
          flex: 1;
          @include E(device-title) {
            height: 26px;
            margin-bottom: 5px;
            // border: 1px solid;
            // border-image: linear-gradient(180deg, #1395ff 0%, rgba(19, 149, 255, 0) 100%);
            @include flex(center, row nowrap, space-between);
            @include E(device-left) {
              padding-left: 10px;
              position: relative;
              @include E(device-img1) {
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
              }
            }
            @include E(device-right) {
              padding-right: 10px;
              font-size: 14px;
              font-family: PingFang SC-Semibold, PingFang SC;
              font-weight: 600;
              color: #f4611e;
            }
          }
        }

        ::v-deep .hy-cell {
          padding: 2px 0;
        }
      }
    }
  }
</style>
<template>
  <CardBox custom-bg title="设备维保信息" :icon-style="{ borderLeftColor: '#FF7738' }">
    <div class="hy-home__device-main">
      <div class="hy-home__device-nav">
        <TabGroup v-model="tabValue">
          <TabItem v-for="(item, index) in tabList" :key="index" :value="item.value">{{ item.label }}</TabItem>
        </TabGroup>
      </div>
      <div class="hy-home__device-body">
        <div class="hy-home__device-li" v-for="item in 3" :key="item">
          <img class="hy-home__device-icon" src="../../../assets/images/home_device_icon.png" alt="icon" />
          <div class="hy-home__device-content">
            <div class="hy-home__device-title">
              <div class="hy-home__device-left">
                <img class="hy-home__device-img1" src="../../../assets/images/home_device_icon1.png" alt="icon1" />
                D-9999-999999
              </div>
              <div class="hy-home__device-right">未进行</div>
            </div>
            <Cell has-icon title="保养类型">设备点检</Cell>
            <Cell has-icon title="生产单元">离散设备</Cell>
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
    name: 'Device',
    components: { Cell, CardBox, TabGroup, TabItem },
    data() {
      return {
        tabList,
        tabValue: 1
      };
    }
  };
</script>
