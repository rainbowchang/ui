<!--Agent二维码下载接口页面-->
<template>
  <div class="center">
    <div class="center_text">
      机床Agent下载<br>
    </div>
    <div class="url_text">
      <div>
        <label>{{personname}}</label><input placeholder="姓名" type="text" v-model="personName"> <br>
        <div id="personMsg" class="errormsg">{{personMsg}}</div>
        <label>{{corpname}}</label><input placeholder="公司" type="text" v-model="corporation"> <br>
        <div id="corpMsg" class="errormsg">{{corpMsg}}</div>
        <label>手机号：</label><input placeholder="手机号" type="text" v-model="phoneNo"> &nbsp;&nbsp;
        <button @click="sendYzm()" v-bind:disabled="dis" style="width: 100px">{{title}}</button><br>
        <div id="phoneNoMsg" class="errormsg">{{yzmmsg}}</div>
        <label>验证码：</label><input placeholder="六位验证码" type="text" v-model="yzm">
      </div>
      <br>
      <button @click="downClick" class="btnConfirm">确定</button>
      <download_form v-show="showDetail" ref="showDetail"></download_form>
      <div id="yzmCheckMsg" class="errormsg">{{yzmCheckMsg}}</div>
    </div>
  </div>
</template>

<script>
import download_form from "./download_form";
import {post} from "@/apis/restUtils"
const smsInterval = 120; //senconds
const emptyChar = '\u2003';

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
      personMsg: emptyChar,
      corpMsg: emptyChar,
      yzmmsg: emptyChar,
      yzm: '',
      yzmCheckMsg: emptyChar,
      dis: false,
      title: '发送验证码',
      personname: '姓\u2003名：',
      corpname: '公\u2003司：'
    }
  },
  methods: {
    downClick() {
      post("/sms/checkyzm",
          {"personName": this.personName, "corporation":this.corporation, "phoneNo":this.phoneNo, "yzm": this.yzm},
          response=>{
            console.log(response);
            if (response.data.status === 'success'){
              this.yzmCheckMsg = emptyChar;
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
        this.personMsg = emptyChar;
      }

      let corporation = this.corporation;
      if(corporation == null ||corporation ==='') {
        this.corpMsg = '公司名称不能为空';
        return;
      } else {
        this.corpMsg = emptyChar;
      }

      let val = this.phoneNo;
      if(val == null ||val ===''){
        this.yzmmsg = "移动电话号码不能为空";
        return;
      } else {
        this.yzmmsg = emptyChar;
      }

      if (!myReg.test(val)) {
        this.yzmmsg = '手机号格式不正确';
        return;
      } else {
        this.yzmmsg = emptyChar;
      }
      post("/sms/getyzmsms",
          {"personName": this.personName, "corporation":this.corporation, "phoneNo":this.phoneNo},
          response=>{
            console.log(response);
            if (response.data.status !== 'success'){
              this.yzmCheckMsg = response.data.result;
            } else {
              this.dis = true;

              this.sendtimer = smsInterval
              setTimeout(() => {
                let timer = window.setInterval(() => {
                  if (this.sendtimer-- <= 1) {
                    this.dis = false
                    this.title= '发送验证码';
                    this.sendtimer = smsInterval
                    window.clearInterval(timer)
                  } else {
                    this.title= '(' + this.sendtimer + 's)';
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
  background: -webkit-linear-gradient(white, #ff3232);
  background: -o-linear-gradient(white, #ff3232);
  background: -moz-linear-gradient(white, #ff3232);
  background: -mos-linear-gradient(white, #ff3232);
  background: linear-gradient(white, #ff3232);
}

.center_text {
  position: absolute;
  top: 20%;
  left: 48%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
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
.btnConfirm{
  position: relative;
  left: 32%;
  width: 20%;
}
.errormsg{
  color:red;
}
</style>