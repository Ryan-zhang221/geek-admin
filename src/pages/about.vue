<template>
  <div>
    <h2>这是关于页面</h2>
    <button @click="toggle">全屏切换</button>

    <h5>你的评分是：{{score}}</h5>
    <Rate :value="score" @update-rate="update" theme="green"></Rate>
    <Rate :value="score" @update-rate="update" theme="white"></Rate>
    <Rate :value="score" @update-rate="update" theme="blue"></Rate>
    <Rate :value="score" @update-rate="update"></Rate>
    <Rate :value="score" @update-rate="update">
      <img src="../assets/logo.png" alt="" width="14">
    </Rate>
    <Count></Count>

    <!-- level为h1~h6级标签 -->
    <Heading :level="1">hello world</Heading>
  </div>

</template>



<script setup>
  import { ref } from 'vue'
  import Rate from '../components/Rate.vue'
  import Count from '../components/Count.vue'
  import Heading from '../components/Heading'

  import { useFullscreen } from '@vueuse/core'

  const { toggle } = useFullscreen()

  let score = ref(3.5)
  function update(num) {
    score.value  = num
  }
</script>
