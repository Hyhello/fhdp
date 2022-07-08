/**
 *@Description:描述
 *@Author: Hyhello
 *@CreateTime: 2021年12月08日 10:41:14
 *@UpdateTime:
 **/
import Vue from 'vue';
import 'normalize.css';
import App from './App.vue';
import router from './router';
import filters from '@/filters';

Vue.config.productionTip = false;
Vue.use(filters);

Vue.prototype.$bus = new Vue();

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app');
