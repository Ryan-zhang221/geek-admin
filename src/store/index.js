import { createStore } from 'vuex'
// import { createStore } from './gvuex.js'

// 我们使用createStore来创建一个数据存储，叫做store，store内部除了数据state，还需要一个
// mutation配置去修改数据，可以把这个mutation理解为数据更新的【申请单】，mutation内部的
// 函数会把state作为参数，我们直接操作state.count就可以完成数据的修改
const store = createStore({
  state() {
    return {
      count: 666
    }
  },
  getters: {
    double(state) {
      return state.count*2
    }
  },
  mutations: {
    add(state) {
      state.count++
    }
  }
})

export default store