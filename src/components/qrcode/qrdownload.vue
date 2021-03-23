<!--Agent二维码下载接口页面-->
<template>
  <div class="center">
    <div class="center_text">
      远控机床通讯Agent<br>
    </div>
    <div class="url_text">
      <div>
        <label>姓&emsp;名：</label><input placeholder="姓名" type="text" v-model="personName"> <br>
        <div id="personMsg" >{{personMsg}}</div><br>
        <label>公&emsp;司：</label><input placeholder="公司" type="text" v-model="corporation"> <br>
        <div id="corpMsg" >{{corpMsg}}</div><br>
        <label>手机号：</label><input placeholder="手机号" type="text" v-model="phoneNo"> &nbsp;&nbsp;
        <button @click="sendYzm()" v-bind:disabled="dis">{{title}}</button><br>
        <div id="phoneNoMsg" >{{yzmmsg}}</div><br>
        <label>验证码：</label><input placeholder="验证码" type="text" v-model="yzm">
      </div>
      <br>
      <button @click="downClick">确定</button>
      <download_form v-show="showDetail" ref="showDetail"></download_form>
      <div id="yzmCheckMsg" >{{yzmCheckMsg}}</div><br>
    </div>
  </div>
</template>

<script>
import download_form from "./download_form";
import {post} from "@/apis/restUtils"

let myReg = /^[1][3-9][0-9]{9}$/;
export default {
  name: "qrdownload",
  components: {
    download_form
  },
  data() {
    return {
      showDetail: false,
      phoneNo: '',
      personName: '',
      corporation: '',
      personMsg: '',
      corpMsg: '',
      yzmmsg: '',
      yzm: '',
      yzmCheckMsg: '',
      dis: false,
      title: '发送验证码',
    }
  },
  methods: {
    downClick() {
      post("/sms/checkyzm",
          {"personName": this.personName, "corporation":this.corporation, "phoneNo":this.phoneNo, "yzm": this.yzm},
          response=>{
            console.log(response);
            if (response.data.status === 'success'){
              this.yzmCheckMsg = '';
              this.showDetail = true;

            } else {
              this.yzmCheckMsg = response.data.result;
            }
          });
    },
    sendYzm() {
      console.log(this.phoneNo);
      let personName = this.personName;
      if(personName == null ||personName ==='') {
        this.personMsg = '姓名不能为空';
        return;
      } else{
        this.personMsg = '';
      }

      let corporation = this.corporation;
      if(corporation == null ||corporation ==='') {
        this.corpMsg = '公司名称不能为空';
        return;
      } else {
        this.corpMsg = '';
      }

      let val = this.phoneNo;
      if(val == null ||val ===''){
        this.yzmmsg = "移动电话号码不能为空";
        return;
      } else {
        this.yzmmsg = '';
      }

      if (!myReg.test(val)) {
        this.yzmmsg = '手机号格式不正确';
        return;
      } else {
        this.yzmmsg = '';
      }
      post("/sms/getyzm",
          {"personName": this.personName, "corporation":this.corporation, "phoneNo":this.phoneNo},
          response=>{
            console.log(response);
            if (response.data.status !== 'success'){
              this.yzmCheckMsg = response.data.result;
            } else {
              this.dis = true;

              this.sendtimer = 120
              setTimeout(() => {
                let timer = window.setInterval(() => {
                  if (this.sendtimer-- <= 1) {
                    this.dis = false
                    this.title= '发送验证码';
                    this.sendtimer = 120
                    window.clearInterval(timer)
                  } else {
                    this.title= '发送验证码(' + this.sendtimer + 's)';
                  }
                }, 1000)
              })
            }
      });
    }
  }
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