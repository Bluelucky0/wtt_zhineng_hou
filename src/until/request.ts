import axios from 'axios';
import { ElMessageBox, ElMessage } from 'element-plus';
import router from '../router';
import { storage } from '../until/token';

const service = axios.create({
  //  baseURL: '/api/v2'
  timeout: 5000,
  withCredentials: true,
});

// 请求拦截器
service.interceptors.request.use(
  (config: any) => {
    if (storage.get('token')) {
      config.headers.Authorization = localStorage.getItem('token');
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(new Error(error));
  },
);

// 响应拦截器
service.interceptors.response.use(
  (response: any) => {
    const res = response.data;
    if (res.status !== 200 && res.status !== 1) {
      (ElMessage as any).error({
        content: res.info || 'Error',
        duration: 5,
        background: true,
      });

      if (res.status === 401 || res.status === 403 || res.status === 408) {
        // 警告提示窗
        (ElMessageBox as any).warning({
          title: '提示',
          content: `你已被登出，可以取消继续留在该页面，或者重新登录`,
          okText: '确定',
          cancalText: '取消',
          width: 300,
          onOk: () => {
            setTimeout(() => {
              (ElMessageBox as any)
                .remove()(ElMessageBox as any)
                .info('退出成功');
              // 可在此处清空token等操作
              router.push('/login');
            }, 2000);
          },
        });
      }
      // 若后台返回错误值，此处返回对应错误对象，下面 error 就会接收
      return Promise.reject(new Error(res.info || 'Error'));
    } else {
      // 注意返回值
      return response.data;
    }
  },
  (error: any) => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误(400)';
          break;
        case 401:
          error.message = '未授权,请登录(401)';
          break;
        case 403:
          error.message = '拒绝访问(403)';
          break;
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`;
          break;
        case 405:
          error.message = '请求方法未允许(405)';
          break;
        case 408:
          error.message = '请求超时(408)';
          break;
        case 500:
          error.message = '服务器内部错误(500)';
          break;
        case 501:
          error.message = '服务未实现(501)';
          break;
        case 502:
          error.message = '网络错误(502)';
          break;
        case 503:
          error.message = '服务不可用(503)';
          break;
        case 504:
          error.message = '网络超时(504)';
          break;
        case 505:
          error.message = 'HTTP版本不受支持(505)';
          break;
        default:
          error.message = `连接错误: ${error.message}`;
      }
    } else {
      error.message = '连接到服务器失败，请联系管理员';
    }
    (ElMessage as any).error({
      content: error.info || error.message || 'Error',
      duration: 5,
      background: true,
    });
    return Promise.reject(error);
  },
);

export default service;
