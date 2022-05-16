/*
  在项目登录成功后，后端会返回一个 token，用来存储用户的加密信息，我们把 token 放在每一次
  的 http 请求的 header 中，后端在收到请求后，会对请求 header 中的 token 进行认证，然后
  解密出用户的信息、过期时间，并查询用户的权限之后，检验完毕才会返回对应的数据

  所以我们要对所有的 http 请求进行统一拦截，确保在请求发出之前，从本地存储中获取 token，这样
  就不需要在每个发起请求的组件内去读取本地存储。后端数据如果出错的话，接口还要进行统一拦截，比
  如接口返回的错误是登录状态过期，那么就要提示用户跳转到登录页面重新登录。
*/

import axios from 'axios'
import store from '../store'
import { getToken } from '../utils/auth'
import { Message } from 'element3'

const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  baseURL: '/',
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      // config.headers['X-Token'] = getToken()
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 401) {
      Message({
        type: 'warning',
        message: '登录失效，请重新登录'
      })
      return Promise.reject(new Error(res.data || 'Error'))
    }
    if (res.code !== 20000) {
      console.log('接口信息报错', res.message)
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('接口信息报错' + error)
    return Promise.reject(error)
  }
)

export default service