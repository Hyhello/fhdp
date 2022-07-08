<!--
 * 作者：Hyhello
 * 时间：2022-06-30
 * 描述：smt看板
-->
<style lang="scss" scoped>
  @import 'src/assets/css/table.scss';
  @include B(smt) {
    @include E(main) {
      height: 900px;
      @include flex(stretch, column nowrap);
      @include E(body) {
        flex: 1;
        min-height: 0;
        @include E(li) {
          background-color: #051a49;
          border: 1px solid rgba(255, 255, 255, 0.1);
          @include when(warn) {
            background-color: rgba(255, 119, 56, 0.1);
            border-color: #ff7738;
          }
          @include when(error) {
            border-color: #ff3838;
            background-color: rgba(255, 56, 56, 0.1);
          }
          & + & {
            margin-top: 10px;
          }
          .warn-text {
            color: #ff7738;
          }
          .error-text {
            color: #ff3838;
          }
          .special-text {
            display: inline-block;
            vertical-align: middle;
            margin-left: 5px;
          }
        }
      }
    }
  }
</style>
<template>
  <CardBox class="hy-smt" title="smt 看板">
    <div class="hy-smt__main">
      <div class="hy-smt__header">
        <table class="box-table" cellspacing="0" cellpadding="0" border="0">
          <colgroup>
            <col width="80" />
            <col />
            <col width="80" />
            <col />
            <col width="60" />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr class="box-table-header">
              <th><div class="cell is-left">订单号</div></th>
              <th><div class="cell is-left">盘号</div></th>
              <th><div class="cell is-left">数量</div></th>
              <th><div class="cell is-left">下单日期</div></th>
              <th><div class="cell is-left">总工时</div></th>
              <th><div class="cell is-left">预计开始时间</div></th>
              <th><div class="cell is-left">实际开始时间</div></th>
              <th><div class="cell is-left">预计结束时间</div></th>
              <th><div class="cell is-left">实际结束时间</div></th>
              <th><div class="cell is-left">交付日期</div></th>
              <th><div class="cell is-left">物料配送时间</div></th>
              <th><div class="cell is-left">单盘工时</div></th>
              <th><div class="cell is-left">是否SOP</div></th>
              <th><div class="cell is-left">备料情况</div></th>
              <th><div class="cell is-left">前工序</div></th>
              <th><div class="cell is-left">后工序</div></th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="hy-smt__body">
        <Carousel height="100%" :type="2" :autoplay="autoplay" :key="autoplay">
          <Carousel-item
            v-for="(item, index) in list"
            :key="index"
            class="hy-smt__li"
            :class="{ 'is-warn': index === 0, 'is-error': index === 1 }"
          >
            <table class="box-table" cellspacing="0" cellpadding="0" border="0">
              <colgroup>
                <col width="80" />
                <col />
                <col width="80" />
                <col />
                <col width="60" />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
              </colgroup>
              <tbody>
                <tr class="box-table-body">
                  <td>
                    <div class="cell is-left">{{ item.ddh }}</div>
                  </td>
                  <td>
                    <div class="cell is-left">{{ item.ph }}</div>
                  </td>
                  <td>
                    <div class="cell is-left">{{ item.sl }}</div>
                  </td>
                  <td>
                    <div class="cell is-left">{{ item.xdrq }}</div>
                  </td>
                  <td>
                    <div class="cell is-left">{{ item.zgs }}</div>
                  </td>
                  <td>
                    <div class="cell is-left">{{ item.yjkssj }}</div>
                  </td>
                  <td>
                    <div class="cell is-left">{{ item.sjkssj }}</div>
                  </td>
                  <td>
                    <div class="cell is-left">{{ item.yjjssj }}</div>
                  </td>
                  <td>
                    <div class="cell is-left">{{ item.sjjssj }}</div>
                  </td>
                  <td>
                    <div class="cell is-left">{{ item.jfrq }}</div>
                  </td>
                  <td>
                    <div class="cell is-left">{{ item.wlpssj }}</div>
                  </td>
                  <td>
                    <div class="cell is-left">{{ item.dpgs }}</div>
                  </td>
                  <td>
                    <div class="cell is-left">{{ item.sfsop }}</div>
                  </td>
                  <td>
                    <div class="cell is-left">{{ item.blqk }}</div>
                  </td>
                  <td>
                    <div class="cell is-left warn-text">
                      <div v-if="index === 0">
                        <img src="../../assets/images/warn_icon.png" alt="warn" />
                        <span class="special-text">下线预警</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="cell is-left error-text">
                      <div v-if="index === 1">
                        <img src="../../assets/images/error_icon.png" alt="error" />
                        <span class="special-text">上线预警</span>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </Carousel-item>
        </Carousel>
      </div>
    </div>
  </CardBox>
</template>
<script>
  import xlsx from '@/mixins/xlsx';
  import { rangeArr } from '@hyhello/utils';
  import CardBox from '@/components/CardBox.vue';
  import { Carousel, CarouselItem } from '@/components/carousel';

  export default {
    name: 'Smt',
    mixins: [xlsx],
    components: { CardBox, Carousel, CarouselItem },
    data() {
      return {
        autoplay: true,
        list: rangeArr(15, {
          ddh: '51050262',
          ph: 'D-1600-0356V10',
          sl: '40000',
          xdrq: '2022/3/9',
          zgs: 88,
          yjkssj: '2022/3/10 8:30',
          sjkssj: '2022/3/10 8:30',
          yjjssj: '2022/3/10 8:30',
          sjjssj: '2022/3/10 8:30',
          jfrq: '2022/3/10 8:30',
          wlpssj: '2022/3/10 8:30',
          dpgs: '',
          sfsop: false,
          blqk: '',
          qgx: '',
          hgx: ''
        })
      };
    }
  };
</script>
