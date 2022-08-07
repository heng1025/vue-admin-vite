import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';

import router from '@/router';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    if (config.url !== '/login') {
      const token = localStorage.getItem('token');
      if (token) {
        Object.assign(config, {
          headers: {
            'X-Token': token,
          },
        });
      } else {
        router.push('/login');
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
axios.interceptors.response.use(<R>(response: AxiosResponse<API.Response<R>>) => {
  const { config, status, data: rawData } = response;
  const { url } = config;

  if (status === 200) {
    const { code, message = 'Ops,err happen!!!', data } = rawData;
    if (code === 0) {
      return data;
    }
    ElMessage({
      message: `${message} [URL: ${url}]`,
      offset: 50,
      type: 'error',
    });
    return Promise.reject(message);
  }
  return Promise.reject('error');
});

export const request = <R>(config: AxiosRequestConfig) => axios.request<API.Response<R>, R>(config);
export const get = <R>(url: string, config?: AxiosRequestConfig) =>
  axios.get<API.Response<R>, R>(url, config);
export const post = <R>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
  axios.post<API.Response<R>, R>(url, data, config);
export default axios;
