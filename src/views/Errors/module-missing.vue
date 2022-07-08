<!--
*@Description:描述
*@Author: Hyhello
*@CreateTime: 2021年12月08日 10:38:09
*@UpdateTime: ''
-->
<style lang="scss" scoped>
  @import 'src/assets/css/mixins';
  .module-missing {
    @include flex(center, row wrap, center);
    overflow: hidden;
    .site-content {
      text-align: center;
    }
    .not-found-desc {
      margin: 0 0 30px;
      font-size: 26px;
      text-transform: uppercase;
      color: rgb(118, 131, 143);
      > em {
        font-style: normal;
        color: #ee8145;
      }
    }
  }
</style>
<template>
  <div class="module-missing">
    <div class="site-content">
      <p class="not-found-desc">抱歉！您访问的页面<em>出错</em>啦 ...</p>
      <p style="color: gray">请尝试刷新页面</p>
    </div>
  </div>
</template>
