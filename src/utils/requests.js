import axios from 'axios'
import { Toast } from 'vant'
import vue from 'vue'
const baseURL = process.env.NODE_ENV === 'production' ? '' : '/api'//环境
const baseURLhd = window.location.protocol + "//" + window.location.host//获取到当前的URl地址
vue.prototype.$axios = axios
const server = axios.create({
    // baseURL: 'http://8.211.49.242:8108/api',//国外服务器
    // baseURL: 'http://192.168.16.118:8108/api',
    // baseURL: 'http://192.168.16.82:8108/api',//正式服
    baseURL: 'http://192.168.16.226:8108/api',//本地
    //请求头携带token进行身份的验证
    // headers: {
    //     'JWTToken': sessionStorage.getItem("JWTToken")
    // },
})

// 添加请求拦截器
server.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("JWTToken")
    if (token) {
        config.headers.JWTToken = token
    }
    return config

    // 在发送请求之前做些什么
}, (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
server.interceptors.response.use((response) => {
    // 对响应数据做点什么
    const code = response.status
    if (code < 200 || code > 300) {
        return Promise.reject('error')
    } else {

        switch (response?.data?.code) {
            case 0:
                break;
            case 1001:
                Toast.fail('请先登录')
                break;
            case 1002:
                Toast.fail('参数不能为空')
                break;
            case 1003:
                Toast.fail('参数格式不正确')
                break;
        }
        return response.data
    }


}, (error) => {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default server