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
      <transition-group name="flip-list" tag="ul">
        <li v-for="(todo,index) in todos" :key="todo.title">
          <input type="checkbox" v-model="todo.done" />
          <span :class="{ done: todo.done }">{{todo.title}}</span>
          <span class="remove-btn" @click="removeTodo($event, index)">❌</span>
        </li>
      </transition-group>
    </ul>
    <div v-else>暂无代办事项</div>
  </div>
  <transition name="modal">
    <div class="info-wrapper" v-if="showModal">
      <div class="info">
        请输入内容！
      </div>
    </div>
  </transition>
  <span class="dustbin">
    <i class="iconfont icon-lajitong_"></i>
  </span>
  <div class="animate-wrap">
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
    >
      <div class="animate" v-show="animate.show">
        <i
          class="iconfont icon-zhifeiji"
          style="font-size:20px;color:#87ceeb;"
        ></i>
      </div>
    </transition>
  </div>
</template>

<script setup>
  import { ref, computed, reactive } from 'vue'
  import { useMouse } from '../utils/mouse.js'
  import { useStorage } from '@vueuse/core'

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

  let animate = reactive({
    show: false,
    el: null
  })
  function beforeEnter(el) {
    let dom = animate.el
    let rect = dom.getBoundingClientRect()
    let x = window.innerWidth - rect.left - 60
    let y = rect.top - 40
    el.style.transform = `translate(-${x}px, ${y}px)`
  }
  function enter(el, done) {
    document.body.offsetHeight
    el.style.transform = `translate(0,0)`
    el.addEventListener('transitionend', done)
  }
  function afterEnter(el) {
    animate.show = false
    el.style.display = 'none'
  }
  function removeTodo(e, i) {
    animate.el = e.target
    animate.show = true
    todos.value.splice(i, 1)
  }

  let { title, todos, showModal, addTodo, clear, active, all, allDone } = useTodos()

  function useTodos() {
    let title = ref('')
    let todos = useStorage('todos', [])
    // 未输入弹窗
    let showModal = ref(false)

    function addTodo() {
      if (!title.value) {
        showModal.value = true
        setTimeout(() => {
          showModal.value = false
        }, 1500)
        return
      }

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

    return { title, todos, showModal, addTodo, clear, active, all, allDone }
  }

</script>

<style scoped>
.iconfont {
    font-size: 73px;
  }
  h2 {
    color: v-bind(color);
  }
  .todoList {
    /* border:1px solid #bfa; */
  }
  .todoList > input {
    width:200px;
    height: 30px;
    /* border: none; */
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
  .info-wrapper { position: fixed; top: 20px; width:200px;}
  .info { padding: 20px; color: white; background: #d88986;}
  .modal-enter-from { opacity: 0; transform: translateY(-60px); }
  .modal-enter-active { transition: all 0.3s ease; }
  .modal-leave-to { opacity: 0; transform: translateY(-60px); }
  .modal-leave-active { transition: all 0.3s ease; }

  .flip-list-move { transition: transform 0.8s ease;}
  .flip-list-enter-active,
  .flip-list-leave-active { transition: all 1s ease;}
  .flip-list-enter-from,
  .flip-list-leave-to { opacity: 0; transform: translateX(30px);}
  .remove-btn {cursor:pointer;}
  .animate-wrap .animate{position :fixed; right :30px; top :30px; z-index: 100; transition: all 0.5s linear;}

  .dustbin {position :fixed; right :20px; top :20px;font-size: 30px;}
</style>

