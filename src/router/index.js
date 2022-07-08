import Vue from 'vue';
import routes from './routes';
import Router from 'vue-router';
import SETTING from '../settings';

// 进度条
const { MODE, BASE_URL } = import.meta.env;

// FIXED 解决报错问题
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const vueRouter = new Router({
  mode: MODE !== 'production' ? 'hash' : 'history',
  base: BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: routes,
  hasDynamicRoutes: false, // 是否已经添加动态(菜单)路由， 主要解决刷新的时候，重新拉取用户信息
  strict: MODE !== 'production'
});

const getPageTitle = (metaTitle) => {
  const { title } = SETTING;
  return metaTitle ? title + '-' + metaTitle : title;
};

// 路由拦截
vueRouter.beforeEach(async (to, from, next) => {
  document.title = getPageTitle(to.meta.title);
  next();
});

Vue.use(Router);

export default vueRouter;
