<template>
  <h2>这是首页</h2>
  <div class="box1"></div>
  <!-- <div class="box" :style="{width: width + 'px'}"></div>
  <button @click="change">click</button> -->

  <button @click="toggle">cccclick</button>
  <transition name="fade">
    <h2 v-if="showTitle">你好v3</h2>
  </transition>
  <Todolist />
</template>

<script setup>
  import Todolist from '../components/Todolist.vue'
  import { ref } from 'vue'

  let width = ref(100)
  function change() {
    width.value += 100
  }

  let showTitle = ref(true)
  function toggle() {
    showTitle.value = !showTitle.value
  }
</script>

<style>
  .box {
    background: skyblue;
    height: 100px;
    /* transition 控制一个元素属性的值，缓慢地变成另外一个值，这种操作叫做过渡 */
    transition: width 1s linear;
  }
  .box1 {
    width: 30px;
    height: 30px;
    position:relative;
    background-color: skyblue;
    animation: move 2s linear infinite
  }
  @keyframes move {
    0%{left: 0px}
    50%{left:200px}
    100%{left: 0px;}
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s linear;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>