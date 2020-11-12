import axios from 'axios'
import vue from 'vue'
const server = axios.create({
    // baseURL: 'http://8.211.49.242/api',//国外服务器
    // baseURL: 'http://192.168.16.118:8108/api',
    // baseURL: 'http://192.168.16.82:8108/api',//正式服
    baseURL: 'https://maps.googleapis.com/maps/api',//本地
    //请求头携带token进行身份的验证
    // headers: {
    //     'JWTToken': sessionStorage.getItem("JWTToken")
    // },
})
export function maplocation(params) {
    return server.request({
        method: 'get',
        url: "/geocode/json?key=AIzaSyAt4GvA-0Agf_M_JuFl6hCj6TYYSzDCqEM",
        params
    })
}
//搜索匹配的地址
export function queryautocomplete(params) {
    return server.request({
        method: 'get',
        url: "/place/queryautocomplete/json?key=AIzaSyAt4GvA-0Agf_M_JuFl6hCj6TYYSzDCqEM",
        params
    })
}