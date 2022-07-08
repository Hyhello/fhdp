/**
 * 作者：Hyhello
 * 时间：2019-05-23
 * 描述：index.js
 */
const modules = import.meta.globEager('./src/*.js');

const install = (Vue) => {
  for (const i in modules) {
    Vue.filter(modules[i].default.name, modules[i].default.handler);
  }
};

export default install;
