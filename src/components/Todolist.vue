<template>
  <div class="todoList" @click="showMouse">
    <h2 @click="add">{{count}}</h2>
    <input type="text" v-model="title" @keydown.enter="addTodo" />
    <button v-if="active < all" @click="clear">清理</button>
    <ul v-if="todos.length">
      <li v-for="todo in todos">
        <input type="checkbox" v-model="todo.done" />
        <span :class="{ done: todo.done }">{{todo.title}}</span>
      </li>
    </ul>
    <div v-else>暂无数据111</div>
    <div>
      全选<input type="checkbox" v-model="allDone" />
      <span>{{ active }} / {{ all }}</span>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { useMouse } from '../utils/mouse.js'
  import { useStorage } from '../utils/use.js'

  let count = ref(1)
  let color = ref('red')
  function add() {
    count.value++
    color.value = Math.random() > 0.5 ? 'blue' : 'red'
  }

  let {x, y} = useMouse()
  function showMouse() {
    console.log(x.value, y.value)
  }


  let { title, todos, addTodo, clear, active, all, allDone } = useTodos()

  function useTodos() {
    let title = ref('')
    let todos = useStorage('todos', [])
    function addTodo() {
      todos.value.push({
        title: title.value,
        done: false
      })
      title.value = ''
    }
    function clear() {
      todos.value = todos.value.filter(v => !v.done)
    }
    let active = computed(() => {
      return todos.value.length - todos.value.filter(v => !v.done).length
    })
    let all = computed(() => todos.value.length)
    let allDone = computed({
      get: function () {
        return active.value === todos.value.length
      },
      set: function (val) {
        todos.value.forEach(todo => {
          todo.done = val
        })
      }
    })

    return { title, todos, addTodo, clear, active, all, allDone }
  }

</script>

<style scoped>
  h2 {
    color: v-bind(color);
  }
  .todoList {
    border:1px solid #bfa;
  }
</style>

