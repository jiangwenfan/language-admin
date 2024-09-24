import axios from "axios";
import config from "./config";

// 创建一个axios实例
const apiClient = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    "Content-Type": "application/json", // 默认的内容类型
  },
});

// 请求拦截器，自动在每个请求中添加 token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // 获取存储在本地的token
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // 在请求头中添加token
    }

    // 添加其他自定义的请求头
    // config.headers["X-Custom-Header"] = "CustomHeaderValue";

    return config;
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error);
  }
);

export default apiClient;
