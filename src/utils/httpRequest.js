/*
 * @Author: Hyhello
 * @Date: 2022-06-06 16:25:42
 * @LastEditTime: 2022-06-08 19:03:11
 * @LastEditors: Hyhello
 * @Description: Do not Edit
 * @FilePath: \cestc-dali-custom\packages\shijiazhuang\src\utils\httpRequest.js
 */
import axios from 'axios';

const errorMessages = (res) => `${res.status} ${res.statusText}`;

const http = axios.create({
  timeout: 30000,
  baseURL: import.meta.env.VITE_APP_BASE_API,
  withCredentials: false // 启用跨域
});

/**
 * 请求拦截
 */
http.interceptors.request.use(
  (conf) => {
    if (!navigator.onLine) {
      return Promise.reject(new Error('网络已断开，请检查网络！'));
    }
    // get 请求加上随机数，防止ie下面有缓存
    if (conf.method === 'get') {
      conf.params = {
        t: new Date().getTime(),
        ...conf.params
      };
    }
    return conf;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 响应拦截
 */
http.interceptors.response.use(
  (res) => {
    // 此处可根据自己的业务进行调整
    if (res.data && res.data.code !== undefined && res.data.code !== 200) {
      return Promise.reject(errorMessages(res));
    }
    // eslint-disable-next-line eqeqeq
    return res.data.data;
  },
  (err) => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.msg = '请求错误(400)';
          break;
        case 401:
          err.msg = '未授权，请重新登录(401)';
          break;
        case 403:
          err.msg = '拒绝访问(403)';
          break;
        case 404:
          err.msg = '请求出错(404)';
          break;
        case 408:
          err.msg = '请求超时(408)';
          break;
        case 500:
          err.msg = '服务器错误(500)';
          break;
        case 501:
          err.msg = '服务未实现(501)';
          break;
        case 502:
          err.msg = '网络错误(502)';
          break;
        case 503:
          err.msg = '服务不可用(503)';
          break;
        case 504:
          err.msg = '网络超时(504)';
          break;
        case 505:
          err.msg = 'HTTP版本不受支持(505)';
          break;
        default:
          err.msg = `连接出错(${err.response.status})!`;
      }
    } else {
      // 可能是请求被取消，这时不需要进行提示
      // err.message = "连接服务器失败!";
    }
    return Promise.reject(err);
  }
);

export default http;
