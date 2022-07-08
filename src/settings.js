/**
 * 作者：Hyhello
 * 时间：2021-07-23
 * 描述：常用配置
 */

// 注意，此处采用了cmd规范，主要为了兼容node，如果在webpack2.0中，则不能如此
export default {
  title: 'template',
  errorLog: process.env.NODE_ENV !== 'production'
};
