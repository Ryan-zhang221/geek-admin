<template>
  <div class="dark-btn" @click="changeMode">
    <i class="iconfont icon-sun" v-if="isDark"></i>
    <i class="iconfont icon-moon" v-else></i>
  </div>
</template>

<script lang="jsx" setup>
  import { ref, defineComponent } from 'vue'
  import themeChanger from '../theme';
  let isDark = ref(false)

  const themeChange = new themeChanger()

  function changeMode() {
    themeChange._darkThemeSwitch()
    isDark.value = !isDark.value
  }
</script>

<style scoped>
  .dark-btn {
    position:fixed;
    right:30px;
    bottom: 30px;
    width:33px;
    height:33px;
    border-radius: 50%;
    display: inline-block;
    cursor:pointer;
  }
  .iconfont {
    font-size: 33px;
  }
  .icon-sun {
    color:#ffcc66;
  }
  .icon-moon {
    color:#75c82b;
  }
  .dark-btn:hover {
    opacity: .7;
  }
</style>