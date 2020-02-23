<template>
  <!-- 箭头椭圆 -->
  <div class="index bcimg">
    <div class="longcircle">
      <div class="bcimg arrowimg">
        <div class="hello" @click="showModal">
          <span>欢迎使用</span>
        </div>
        <div class="spread" @click="mapform">
          <span>机床分布</span>
        </div>
        <div class="equip" @click="equips">
          <span>设备平台</span>
        </div>
      </div>
    </div>
    <!-- 弹框 -->
    <Modal v-model="modal1" fullscreen title-hide footer-hide>
      <div>
        <div class="tips">
          <span v-if="isSended">{{sendtimer}}秒后可关闭</span>
          <Icon v-if="!isSended" @click="closeModal" style="font-size:2rem;font-weight:600;" type="ios-close-circle-outline" />
        </div>
        <img :src="contentImg" class="backImg" />
      </div>
    </Modal>
  </div>
</template>

<script>
import pic1 from "../../assets/imgs/back.jpg";
export default {
  data() {
    return {
      isSended: false,
      modal1: false,
      showModalFlag: false,
      sendtimer: 5,
      contentImg: pic1
    };
  },
  created() {
    if(localStorage.getItem("Flag") == "true")
      this.showModal();
    else
      this.closeModal();
    localStorage.setItem("Flag", false);
  },
  methods: {
    closeSelf() {
      this.showModalFlag = false;
    },
    closeModal() {
      this.modal1 = false;
    },
    showModal() {
      this.modal1 = true;
      // 倒计时60秒
      this.sendtimer = 5;
      this.isSended = true;
      setTimeout(() => {
        let timer = window.setInterval(() => {
          if (this.sendtimer-- <= 1) {
            this.isSended = false;
            this.sendtimer = 5;
            window.clearInterval(timer);
          }
        }, 1000);
      });
    },
    ok() {
      this.$Message.info("点击了确定");
    },
    cancel() {
      this.$Message.info("点击了取消");
    },
    mapform() {
      this.$router.push("map");
    },
    equips() {
      this.$router.push("meua");
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
  position: absolute;
  width: 9rem;
  height: 9rem;
  border-radius: 50%;
  background-color: aliceblue;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.arrowimg>div >span{
  font-size: 2rem;
  font-weight: bold;
}
.hello {
  left: 35%;
  top: -45px;
  margin: auto;
  cursor: pointer;
}
.spread {
  cursor: pointer;
  bottom: -35px;
  left: -75px;
}
.equip {
  cursor: pointer;
  bottom: -35px;
  right: -80px;
}
.tips {
  position: absolute;
  z-index: 33;
  top: 15px;
  right: 45px;
  cursor: pointer;
}
.backImg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  object-fit: cover;
}
</style>