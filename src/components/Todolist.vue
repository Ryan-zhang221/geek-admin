<template>
  <div class="todoList" @click="showMouse">
    <h2 @click="add">{{count}}</h2>
    <input type="text" placeholder="请输入代办事项" v-model="title" @keydown.enter="addTodo" />
    <button v-if="active <= all" @click="clear">清理</button>
    <div class="check">
      全选<input type="checkbox" v-model="allDone" />
      <span>{{ active }} / {{ all }}</span>
    </div>
    <ul v-if="todos.length" class="list">
      <li v-for="(todo,index) in todos" :key="index">
        <input type="checkbox" v-model="todo.done" />
        <span :class="{ done: todo.done }">{{todo.title}}</span>
      </li>
    </ul>
    <div v-else>暂无代办事项</div>
    
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
    // console.log(x.value, y.value)
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
      const flag = todos.value.every(v => !v.done)
      if (flag) {
        alert('请选择要清理的选项~')
        return
      }
      todos.value = todos.value.filter(v => !v.done)
    }
    let active = computed(() => {
      return todos.value.length - todos.value.filter(v => !v.done).length
    })
    let all = computed(() => todos.value.length)
    let allDone = computed({
      get: function () {
        if (active.value === 0) {
          return false
        }
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
  .todoList > input {
    width:200px;
    height: 30px;
    border: none;
    border-radius: 5px;
    padding-left: 16px;
  }
  .todoList > button {
    width: 50px;
    height: 30px;
    background-color: yellow;
    border: none;
    border-radius: 5px;
    margin-left: 8px;
  }
  .list {
    width: 274px;
    height: auto;
    margin: 16px auto 0;
    list-style: none;
  }
  .list li {
    text-align: left;
    line-height: 30px;
  }
  .list input {
    margin-right: 8px;
  }
  .check {
    width:274px;
    margin: 16px auto 0;
    text-align: left;
  }
  .check input {
    margin: 0 8px;
  }
</style>

