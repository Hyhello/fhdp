<!--
 * 作者：Hyhello
 * 时间：2022-06-30
 * 描述：订单详情
-->
<style lang="scss" scoped>
  @include B(line) {
    @include E(statistics) {
      padding: 20px 27px 33px;
      margin: 0 -7px -7px -7px;
      background: url('../../../assets/images/statistics_bg.png') no-repeat 0 0;
      background-size: 100% 100%;
      @include E(statistics-header) {
        font-size: 22px;
        font-family: PingFang SC-Semibold, PingFang SC;
        font-weight: 600;
        color: #0e82ff;
        margin-bottom: 20px;
      }
      @include E(statistics-body) {
        @include flex(center, row nowrap);
        @include E(statistics-card) {
          flex: 1;
          @include flex(center, row nowrap);
          @include E(statistics-img) {
            @include wh(64px, 64px);
            margin-right: 15px;
            opacity: 0.6;
          }
          @include E(statistics-title) {
            font-size: 14px;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #b9d1da;
            margin-bottom: 12px;
          }
          @include E(statistics-text) {
            font-size: 20px;
            line-height: 1;
            font-family: PingFang SC-Semibold, PingFang SC;
            font-weight: 500;
            color: #e6ffff;
          }
        }
      }
    }
  }
</style>
<template>
  <CardBox custom-bg title="订单详情">
    <div class="hy-line__statistics">
      <div class="hy-line__statistics-header">{{ info.ddh || '20220119006_wrt' }}</div>
      <div class="hy-line__statistics-body">
        <div class="hy-line__statistics-card">
          <img class="hy-line__statistics-img" src="../../../assets/images/icon-1.png" alt="icon-1" />
          <div class="hy-line__statistics-content">
            <div class="hy-line__statistics-title">名称规则</div>
            <div class="hy-line__statistics-text">{{ info.mcgz || '2201764R2201764' }}</div>
          </div>
        </div>
        <div class="hy-line__statistics-card">
          <img class="hy-line__statistics-img" src="../../../assets/images/icon-2.png" alt="icon-1" />
          <div class="hy-line__statistics-content">
            <div class="hy-line__statistics-title">单元号</div>
            <div class="hy-line__statistics-text">{{ info.dyh || 'SMT10线' }}</div>
          </div>
        </div>
        <div class="hy-line__statistics-card">
          <img class="hy-line__statistics-img" src="../../../assets/images/icon-3.png" alt="icon-1" />
          <div class="hy-line__statistics-content">
            <div class="hy-line__statistics-title">订单交期</div>
            <div class="hy-line__statistics-text">{{ info.ddjq || '2022.10.16' }}</div>
          </div>
        </div>
        <div class="hy-line__statistics-card">
          <img class="hy-line__statistics-img" src="../../../assets/images/icon-4.png" alt="icon-1" />
          <div class="hy-line__statistics-content">
            <div class="hy-line__statistics-title">计划数</div>
            <div class="hy-line__statistics-text">{{ info.jhs || '999' }}</div>
          </div>
        </div>
        <div class="hy-line__statistics-card">
          <img class="hy-line__statistics-img" src="../../../assets/images/icon-5.png" alt="icon-1" />
          <div class="hy-line__statistics-content">
            <div class="hy-line__statistics-title">监控数</div>
            <div class="hy-line__statistics-text">{{ info.jks || '99' }}</div>
          </div>
        </div>
        <div class="hy-line__statistics-card">
          <img class="hy-line__statistics-img" src="../../../assets/images/icon-6.png" alt="icon-1" />
          <div class="hy-line__statistics-content">
            <div class="hy-line__statistics-title">状态</div>
            <div class="hy-line__statistics-text" style="color: #24deff">{{ info.zt || '生产中' }}</div>
          </div>
        </div>
      </div>
    </div>
  </CardBox>
</template>
<script>
  import CardBox from '@/components/CardBox.vue';
  export default {
    name: 'Statistics',
    components: { CardBox },
    inject: ['Lines'],
    computed: {
      info() {
        return this.Lines.info;
      }
    }
  };
</script>
