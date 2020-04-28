import axios from "axios"// 使用axios请求
//import { Toast } from 'vant';
import { Message } from 'element-ui';
/** 
 * 提示函数 
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = msg => {    
  Message({        
        message: msg,        
        duration: 1000,        
        type: 'error'    
    });
}
// 创建一个 axios 实例
const service = axios.create({
  timeout: 5000 // 请求超时时间
})
service.defaults.withCredentials=true
// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在请求发送之前做一些处理
    // const token = util.cookies.get('token')
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    // config.headers['X-Token'] = token
    return config
  },
  error => {
    // 发送失败
    console.log(error)
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // axios 返回数据中的 data
    return response.data
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400: tip('请求错误'); break
        case 401: tip('未授权，请登录'); break
        case 403: tip('拒绝访问'); break
        case 404: tip(`请求地址出错: ${error.response.config.url}`); break
        case 408: tip('请求超时'); break
        case 500: tip('服务器内部错误'); break
        case 501: tip('服务未实现'); break
        case 502: tip('网关错误'); break
        case 503: tip('服务不可用'); break
        case 504: tip('网关超时'); break
        case 505: tip('HTTP版本不受支持'); break
        default: break
      }
    }
    return Promise.reject(error)
  }
)

export default service
