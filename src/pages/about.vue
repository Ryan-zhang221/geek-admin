<template>
  <h2>这是关于页面</h2>
  <button @click="toggle">全屏切换</button>

  <h5>你的评分是：{{score}}</h5>
  <Rate :value="score" @update-rate="update" theme="green"></Rate>
  <Rate :value="score" @update-rate="update" theme="white"></Rate>
  <Rate :value="score" @update-rate="update" theme="blue"></Rate>
  <Rate :value="score" @update-rate="update"></Rate>
  <Rate :value="score" @update-rate="update"></Rate>
  <Rate :value="score" @update-rate="update"></Rate>
</template>



<script setup>
  import { ref } from 'vue'
  import Rate from '../components/Rate.vue'

  import { useFullscreen } from '@vueuse/core'

  const { isFullscreen, enter, exit, toggle } = useFullscreen()

  let score = ref(3.5)
  function update(num) {
    score.value  = num
  }
</script>