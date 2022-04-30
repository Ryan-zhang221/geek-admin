<template>
  <div>
    <router-link to="/">首页</router-link> | 
    <router-link to="/about">关于</router-link>
  </div>
  <router-view></router-view>
</template>


<style>
* {
  margin: 0;
  padding: 0;
}
a {
  color: salmon;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #282c34;
  width: 100%;
  height: 100vh;
  color: #fff;
}
</style>
