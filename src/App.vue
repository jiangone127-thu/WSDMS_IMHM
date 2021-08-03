<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
* {
  padding: 0;
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // color: #2c3e50;
  width: 100vw;
  height: 100vh;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
/deep/ .full_main {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
:root {
  font-size: 20px;
  color: #fff;
}
.radioBox{
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 1px solid #EEE;
  border-radius: 2px;
  background: #fff;
  cursor: pointer;
}
.radioBox_active{
  background: #0ff;
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 1px solid #EEE;
  border-radius: 2px;
  cursor: pointer;
}
.el-scrollbar {
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
</style>
