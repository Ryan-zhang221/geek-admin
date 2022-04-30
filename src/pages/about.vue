<template>
  <h2>这是关于页面</h2>
  <button @click="toggle">全屏切换</button>
</template>

<script setup>
  import { useFavicon } from '../utils/use';
  import { useFullscreen } from '@vueuse/core'
  let { favicon } = useFavicon()
  function loading() {
    favicon.value = '/assets/close.png'
  }
  const { isFullscreen, enter, exit, toggle } = useFullscreen()
</script>