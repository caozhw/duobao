<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
// @import './styles/reset.scss';
@charset "utf-8";
body {
  max-width: 10rem; 
  margin:0 auto;
  color: #677887;
  background: #ffffff;
  font-family: "微软雅黑";
}
ul li {
  list-style-type: none;
}
img {
  border: none;
}
i,
em {
  font-style: normal;
}
a,
input {
  outline: none !important;
  text-decoration: none !important;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0) !important;
  -webkit-tap-highlight-color: transparent !important;
  /* 清除高亮 For some Androids,个人感觉是低版本的安卓，4.0以下 */
}
input {
  outline: none;
  border: none;
}
button{
  margin: 0;
  padding: 0;
  border: 0px solid transparent;  
  outline: none;
}

</style>
