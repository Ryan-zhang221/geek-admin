<template>
  <el-container>
    <el-header>
      <el-menu
        :default-active="1"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-submenu index="2">
          <template v-slot:title>我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template v-slot:title>选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3">消息中心</el-menu-item>
        <el-menu-item index="4">
          <a href="https://element3-ui.com" target="_blank">订单管理</a>
        </el-menu-item>
      </el-menu>
      <DarkSwitch />
    </el-header>
    <el-container style="height:calc(100vh - 61px);">
      <el-aside width="200px">
        <div>
          <router-link to="/"> 首页 </router-link>
        </div>
        <div>
          <router-link to="/about"> 关于 </router-link>
        </div>
        <!-- <div>
          <router-link to="/login"> 登录 </router-link>
        </div> -->
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup>
  import DarkSwitch from './components/DarkSwitch.vue'
  // import DarkSwitch from './components/DarkSwitch.js'
</script>

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
  width: 100%;
  height: 100vh;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
}
.el-main {
  background-color: #e0eef3;
  color: #333;
}
body > .el-container {
  margin-bottom: 40px;
}
</style>
