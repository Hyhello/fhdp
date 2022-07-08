/**
 * 作者：Hyhello
 * 时间：2021-05-31
 * 描述：import
 */
import ModuleMissing from '@/views/Errors/module-missing.vue';
const modules = import.meta.glob('../views/**/*.vue');
const _import = (file) => {
  if (!modules['../views/' + file + '.vue']) {
    return ModuleMissing;
  }
  return modules['../views/' + file + '.vue'];
};

export default _import;
