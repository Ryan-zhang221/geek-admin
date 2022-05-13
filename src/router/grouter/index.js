import { ref, inject } from 'vue'
// import { RouterLink } from 'vue-router'
import { RouterLink } from './RouterLink.vue'
import { RouterView } from './RouterView.vue'

const ROUTER_KEY = '__router__'

// 创建Router实例
function createRouter(options) {
  return new RouterLink(options)
}

// 获取路由实例
function useRouter() {
  return inject(ROUTER_KEY)
}

// 返回hash模式相关的监听代码
function createWebHashHistory() {
  function bindEvents(fn) {
    // #后面的内容变化会触发hashchange事件
    window.addEventListener('hashchange', fn)
  }
  return {
    bindEvents,
    // http://www.xxx.com/#/login location包含当前url的信息 hash属性就是#开始的地方
    // slice(1)：从hash的第一个子符串（/）后的所有字符
    url: window.location.hash.slice(1) || '/'
  }
}

class Router {
  constructor(options) {
    this.history = options.history
    this.routes = options.routes
    this.current = ref(this.history.url)

    this.history.bindEvents(() => {
      this.current.value = window.location.hash.slice(1)
    })
  }
  install(app) {
    app.provide(ROUTER_KEY, this)
    app.component('router-link', RouterLink)
    app.component('router-view', RouterView)
  }
}

export {createRouter, createWebHashHistory, useRouter}

