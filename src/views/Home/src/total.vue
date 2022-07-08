<!--
 * 作者：Hyhello
 * 时间：2022-07-03
 * 描述：全部产线
-->
<style lang="scss" scoped>
  @include B(home) {
    @include E(total) {
      position: absolute;
      width: 400px;
      top: 77px;
      left: 50px;
      z-index: 2;
      @include E(total-header) {
        width: 400px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        margin-bottom: 20px;
        background: rgba(#0e82ff, 0.2);
        font-size: 16px;
        font-family: PingFang SC-Semibold, PingFang SC;
        font-weight: 600;
        color: #ffffff;
      }
      @include E(total-main) {
        position: relative;
        z-index: 0;
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
        @include E(total-nav) {
          padding: 0 10px;
          padding-bottom: 10px;
        }
        @include E(total-body) {
          padding: 10px;
          height: 782px;
          overflow: auto;
          overflow-x: hidden;
          @include E(total-li) {
            padding: 10px 20px;
            margin: 0 auto;
            width: 380px;
            height: 110px;
            background: url('../../../assets/images/home__card_bg.png') no-repeat center center;
            background-size: 100%;
            & + & {
              margin-top: 20px;
            }

            @include E(total-lheader) {
              margin-bottom: 10px;
              @include flex(center, row nowrap, space-between);
              @include E(total-title) {
                font-size: 14px;
                font-family: PingFang SC-Semibold, PingFang SC;
                font-weight: 600;
                color: #ffffff;
                line-height: 23px;
                height: 23px;
                > img {
                  margin-right: 10px;
                  vertical-align: -4px;
                }
              }
              @include E(total-extra) {
                font-size: 20px;
                font-family: PingFang SC-Semibold, PingFang SC;
                font-weight: 600;
                color: #e6f4ff;
              }
            }
          }
        }
      }
    }
  }
</style>
<template>
  <div class="hy-home__total">
    <div class="hy-home__total-header">全部产线</div>
    <CardBox custom-bg title="全部产线" :icon-style="{ borderLeftColor: '#FF7738' }">
      <div class="hy-home__total-main">
        <div class="hy-home__total-nav">
          <TabGroup v-model="tabValue">
            <TabItem v-for="(item, index) in tabList" :key="index" :value="item.value">{{ item.label }}</TabItem>
          </TabGroup>
        </div>
        <div class="hy-home__total-body">
          <div class="hy-home__total-li" v-for="item in 10" :key="item">
            <div class="hy-home__total-lheader">
              <div class="hy-home__total-title">
                <img src="../../../assets/images/total_icon.png" alt="total_icon" />
                <span>ASD9999-2X2</span>
              </div>
              <div class="hy-home__total-extra">{{ 99999 | splitNum }}</div>
            </div>
            <Cell has-icon title="产品代码：">D-9999-999999</Cell>
            <Cell has-icon title="时间：">2022-05-18 10:22 - 2022-05-18 10:22</Cell>
          </div>
        </div>
      </div>
    </CardBox>
  </div>
</template>
<script>
  import { tabList } from '../const';
  import Cell from '@/components/Cell.vue';
  import CardBox from '@/components/CardBox.vue';
  import { TabGroup, TabItem } from '@/components/tab';
  export default {
    name: 'Total',
    components: { Cell, CardBox, TabGroup, TabItem },
    data() {
      return {
        tabList,
        tabValue: 1
      };
    }
  };
</script>
