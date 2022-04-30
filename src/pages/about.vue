<template>
  <h2>这是关于页面</h2>
  <button @click="toggle">全屏切换</button>
  <Rate :value="score"></Rate>
  <Rate :value="score" theme="green"></Rate>
  <Rate :value="score" theme="yellow"></Rate>
</template>



<script setup>
  import { ref } from 'vue'
  import Rate from '../components/Rate.vue'

  import { useFullscreen } from '@vueuse/core'

  const { isFullscreen, enter, exit, toggle } = useFullscreen()

  let score = ref(2)
</script>