<!--二维码下载ios接口页面-->
<template>
  <div class="center">
    <div class="center_text">
      远控移动APP<br>
    </div>
    <div class="url_text">
      <a href="itms-services://?action=download-manifest&url=https://loc.tdlbs.com/release/yk/yk.plist">点击下载</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "qrhome"
}
</script>

<style scoped>
.center {
  position: relative;
  height: 100%;
}

.center_text {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  /*width: 300px;*/
  /*height: 600px;*/
}
.url_text{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
}
</style>