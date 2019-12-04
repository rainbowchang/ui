<template>
  <!-- 箭头椭圆 -->
  <div class="index bcimg">
    <div class="longcircle">
      <div class="bcimg arrowimg">
        <div class="hello" @click="showModal">欢迎使用</div>
        <div class="spread" @click="mapform">机床分布</div>
        <div class="equip" @click="equips">设备平台</div>
      </div>
    </div>
    <!-- 弹框 -->
    <Modal v-model="modal1" fullscreen title-hide footer-hide>
      <div>
        <div class="tips">
          <span v-if="isSended">{{sendtimer}}秒后可关闭</span>
          <span v-if="!isSended" @click="closeModal">x</span>
        </div>
        <img :src="contentImg" class="backImg">
      </div>
    </Modal>
  </div>
</template>

<script>
import pic1 from '../../assets/imgs/back.jpg'
export default {
  data() {
    return {
      isSended: false,
      modal1: false,
      showModalFlag: false,
      sendtimer: 5,
      contentImg: pic1
    }
  },
  created() {
    this.closeSelf()
  },
  methods:{
    closeSelf () {
      this.showModalFlag = false
    },
    closeModal () {
       this.modal1 = false
    },
    showModal () {
      this.modal1 = true
      // 倒计时60秒
    this.sendtimer = 5
    this.isSended = true
    setTimeout(() => {
        let timer = window.setInterval(() => {
            if (this.sendtimer-- <= 1) {
                this.isSended = false
                this.sendtimer = 5
                window.clearInterval(timer)
            }
        }, 1000)
    })
    },
    ok () {
        this.$Message.info('点击了确定');
    },
    cancel () {
        this.$Message.info('点击了取消');
    },
    mapform(){
      this.$router.push("map")
    },
    equips(){
      this.$router.push("meua")
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bcimg {
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.index {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/imgs/01.png");
}
.longcircle {
  width: 900px;
  height: 600px;
  border-radius: 50%;
  background-color: aliceblue;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.arrowimg {
  background-image: url("../../assets/imgs/arrow.png");
  width: 460px;
  height: 400px;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
}
.arrowimg > div {
  font-size: 2rem;
  font-weight: bold;
  position: absolute;
}
.hello {
  left: 35%;
  top: -20px;
  margin: auto;
  cursor:pointer;
}
.spread {
  cursor:pointer;
  bottom: 65px;
  left: -65px;
}
.equip {
  cursor:pointer;
  bottom: 65px;
  right: -70px;
}
.tips {
  position: absolute;
    z-index: 33;
    top: 15px;
    right: 45px;
    cursor:pointer;
}
.backImg {
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
  z-index:5;
  object-fit: cover;
}
</style>