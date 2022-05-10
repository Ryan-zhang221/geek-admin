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
  // mutations是用来同步处理数据
  mutations: {
    add(state) {
      state.count++
    }
  },
  // actions是用来异步处理数据的
  // 这个配置中的所有函数，可以通过解构获得commit函数，内部的异步任务完成后，就随时可以调用
  // commit来执行mutations去更新数据
  // action并不是直接修改数据，而是通过mutations去修改
  // actions的调用方式是使用store.dispatch
  actions: {
    asyncAdd({commit}) {
      setTimeout(() => {
        commit('add')
      }, 1000)
    }
  }
})

export default store