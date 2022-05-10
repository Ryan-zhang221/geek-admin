<template>
  <div @click="add">
    {{count}}
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  // 获取数据源
  let store = useStore() 

  // count不是使用ref直接定义，而是使用计算属性返回store.state.count，就
  // 是store/index.js中定义的count
  let count = computed(() => store.state.count) 


  // add函数是用来修改数据，我们不能直接去操作store.state.count += 1，因为这个数据
  // 属于vuex统一管理，我们需要使用store.commit('add')去触发vuex中的mutation去修改数据
  function add() {
    store.commit('add')
  }
</script>