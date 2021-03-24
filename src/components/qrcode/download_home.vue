<template>
  <div class="center">
    <div class="center_title">
      应用下载<br>
    </div>
    <div class="tab_item tab1">
      <a href="itms-services://?action=download-manifest&url=https://loc.tdlbs.com/release/yk/yk.plist">
        <div class="qriosbox"></div>
      </a><br>
      <span class="span_foot">iOS</span>
    </div>
    <div class="tab_item tab2">
      <a href="https://yuankongit.cn/release/app/yk.apk">
        <div class="qrbox"></div>
      </a><br>
      <span class="span_foot">Android</span>
    </div>
    <div class="tab_item tab3">
      <a target="_blank">
        <div class="agentbox" @click="toAgentDownload"></div>
      </a><br>
      <span class="span_foot">Windows Agent</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "download_home",
  methods:{
    toAgentDownload(){
      console.log("#######################");
      this.$router.push("qrdownload");
    }
  }
}
</script>

<style scoped>
.center {
  position: relative;
  height: 100%;
  background: -webkit-linear-gradient(white, #ff3232);
  background: -o-linear-gradient(white, #ff3232);
  background: -moz-linear-gradient(white, #ff3232);
  background: -mos-linear-gradient(white, #ff3232);
  background: linear-gradient(white, #ff3232);
}

.center_title {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  /*width: 300px;*/
  /*height: 600px;*/
}
.tab_item{
  position: absolute;
  height: 150px;
  width: 100px;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
}
.tab1{
  left: 25%;
}
.tab2{
  left: 50%;
}
.tab3{
  left: 75%;
}

.qrbox {
  position: absolute;
  /*right: 5px;*/
  bottom: 5px;
  width: 90px;
  height: 90px;
  /*border-radius: 50%;*/
  top: 0%;
  overflow: hidden;
  background-color: aliceblue;
  background-image: url("../../assets/imgs/QRCode.png");
  background-size: 90px  90px;
}
.qriosbox{
  position: absolute;
  /*right: 5px;*/
  bottom: 5px;
  width: 90px;
  height: 90px;
  /*border-radius: 50%;*/
  top: 0%;
  overflow: hidden;
  background-color: aliceblue;
  background-image: url("../../assets/imgs/QRiOS.png");
  background-size: 90px  90px;
}
.agentbox{
  position: absolute;
  /*right: 5px;*/
  bottom: 5px;
  width: 90px;
  height: 90px;
  /*border-radius: 50%;*/
  top: 0%;
  overflow: hidden;
  background-color: aliceblue;
  background-image: url("../../assets/imgs/CaptalA.png");
  background-size: 90px  90px;
}
.span_foot{
  position: relative;
  top: 50%;
}
</style>