<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "app",
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
.intNum {
  border-left: 1px solid black;
  height: 20px;
  position: relative;
}
.fiveNum {
  border-left: 1px solid black;
  height: 17px;
}
.floatNum {
  border-left: 1px solid black;
  height: 10px;
}
.bgColor {
  height: 50px;
  width: 15px;
  color: red;
  border-left: 1px solid red;
}
.tishi {
  position: absolute;
  bottom: 30px;
  right: -5px;
  font-size: 12px;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}
.hiddenDiv{
  width: 1px;
}


</style>>
