<!--
 * 作者：Hyhello
 * 时间：2022-06-30
 * 描述：线体计划看板
-->
<style lang="scss" scoped>
  @include B(line) {
    @include E(group) {
      margin: 20px 0;
      @include flex(stretch, row nowrap);
      .mr20 {
        margin-right: 20px;
      }
    }
  }
</style>
<template>
  <div class="hy-line">
    <!-- 顶部统计部分 -->
    <Statistics></Statistics>
    <div class="hy-line__group">
      <Unqualified class="mr20"></Unqualified>
      <Quality></Quality>
    </div>
    <Reach></Reach>
  </div>
</template>
<script>
  import * as childs from './src';
  import xlsx from '@/mixins/xlsx';
  import { convert2Pinyin } from '@/utils/pinyin';

  export default {
    name: 'Lines',
    mixins: [xlsx],
    components: { ...childs },
    data() {
      return {
        info: {}
      };
    },
    provide() {
      return {
        Lines: this
      };
    },
    methods: {
      formatData(list) {
        this.info = {};
        const data = list[0] || {};
        for (const key in data) {
          this.info[convert2Pinyin(key)] = data[key];
        }
        console.log(this.info);
      }
    }
  };
</script>
