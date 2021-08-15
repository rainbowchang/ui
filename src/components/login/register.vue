<template>
  <div class="wrapper">
    <div class="loginbox">
      <Form ref="formuser" class="formlogin" :model="formuser" :rules="ruleInline" inline :label-width="80">
        <FormItem label="手机号" type="number" prop="tel" class="labelCss">
            <i-input v-model="formuser.tel" placeholder="可用于登录和找回密码">
                <i-select v-model="select1" slot="prepend" style="width: 80px;height: 32px;">
                    <i-option value="+86">+86</i-option>
                </i-select>
            </i-input>
        </FormItem>
        <FormItem label="用户名" prop="username" class="labelCss">
          <i-input type="text" v-model="formuser.username" placeholder="请设置用户名"></i-input>
        </FormItem>
        <FormItem label="密码" prop="password" class="labelCss">
          <i-input type="password" v-model="formuser.password" placeholder="请设置登录密码"></i-input>
        </FormItem>
        <FormItem label="密码确认">
          <i-input type="password" v-model="verifyPassword" placeholder="请确认登录密码"></i-input>
        </FormItem>
        <FormItem label="公司" prop="company" class="labelCss">
          <i-input type="text" v-model="formuser.company" placeholder="请设置公司名"></i-input>
        </FormItem>
        <FormItem label="所属行业">
          <Select v-model="formuser.trade">
            <Option value="工业">工业</Option>
            <Option value="农业">农业</Option>
            <Option value="服务业">服务业</Option>
            <Option value="金融">金融</Option>
          </Select>
        </FormItem>
        <FormItem label="地区" prop="area" class="labelCss">
          <Select v-model="formuser.area" v-on="setArea(formuser.area)">
            <Option v-for="area in areas" :value="area" :key="area">{{area}}</Option>
          </Select>
        </FormItem>
        <FormItem label="省份" prop="province" class="labelCss">
          <Select v-model="formuser.province">
            <Option v-for="province in provinces" :value="province" :key="province">{{province}}</Option>
          </Select>
        </FormItem>
        <FormItem label="地址" prop="address" class="labelCss">
          <i-input type="text" v-model="formuser.address" placeholder="请设置地址"></i-input>
        </FormItem>
        <FormItem label="紧急联系人" prop="linkman" class="labelCss">
          <i-input type="text" v-model="formuser.linkman" placeholder="请设置紧急联系人"></i-input>
        </FormItem>
        <FormItem label="验证码" prop="sessionCode" class="labelCss">
          <i-input style="width: 30%;" type="number" v-model="formuser.sessionCode" placeholder="请输入验证码"></i-input>
          <Button v-show="isSended" class="btn-default">{{ sendtimer + '秒后获取' }}</Button>
          <i-button v-show="!isSended" style="margin-left: 10px;" @click="sendMoblie(formuser.tel)">获取短信验证码</i-button>
        </FormItem>
        <FormItem class="loginbtn">
          <Button @click="handleSubmit('formuser')"><span style="margin-left: 45px;">注册</span></Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import {post,areas, getProvinceByArea} from "@/apis/restUtils"
export default {
  data() {
    return {
      verifyPassword: "",
      isSended: false,
      sendtimer: 60,
      select1: '+86',
      single: false,
      formuser: {
        username: '',
        password: '',
        tel: 1,
        area: '',
        province: '',
        address: '',
        company: '',
        linkman: '',
        trade: '',
        sessionCode: ''
      },
      ruleInline: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        tel: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur"
          }
        ],
        sessionCode: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "密码长度不得低于6",
            trigger: "blur"
          }
        ]
      },
      areas: areas,
    };
  },
  methods: {
    created() {
      this.select1.state = "+86"
    },
    //   发送验证码
    setArea(area){
      this.provinces = getProvinceByArea(area)
    },
    sendMoblie(mobile) {
      if (!mobile) {
        this.$Message.error('请输入手机号！')
        return
      }
      post("/sms/getyzm",
          {"phoneNo":mobile},
          response=>{
            console.log(response);
            if (response.data.status !== 'success'){
              // this.yzmCheckMsg = response.data.result;
            } else {
              // 倒计时120秒
              this.sendtimer = 120
              this.isSended = true
              setTimeout(() => {
                let timer = window.setInterval(() => {
                  if (this.sendtimer-- <= 1) {
                    this.isSended = false
                    this.sendtimer = 120
                    window.clearInterval(timer)
                  }
                }, 1000)
              })
            }
          }
      );
      console.log(mobile)
    },
    // 注册
    handleSubmit(name) {
      post("/sms/checkyzm",
          {"phoneNo":this.formuser.tel, "yzm": this.formuser.sessionCode},
          response=>{
            console.log(response);
            if (response.data.status === 'success'){
              this.postYzm(name)
            } else {
              this.$Message.error(response.data.result);
            }
          });
    },

    postYzm(name){
      let router = this.$router;
      let param = this.formuser;
      console.log(name)
      if(this.verifyPassword != this.formuser.password) {
        this.$Message.error("两次输入的密码不一致!");
        return
      }
      this.$refs[name].validate(valid => {
        post("/user/register",param,reponse => {
          if (valid && reponse.data.status == "success") {
            this.$Message.success("注册成功，请登录!");
            router.push({ path: "/login" })
          } else {
            this.$Message.error("注册失败，用户名已存在，请重新注册!");
          }
        });
      });
    },

    register(){
        this.$router.push("register")
    },
  }
};
</script>

<style scoped>
.wrapper {
  top: 0;
  bottom: 0;
  overflow: auto;
  width: 100%;
  height: 100%;
  background: -webkit-linear-gradient(white, red);
  background: -o-linear-gradient(white, red);
  background: -moz-linear-gradient(white, red);
  background: -mos-linear-gradient(white, red);
  background: linear-gradient(white, red);
}
.loginbox {
  width: 75%;
  height: auto;
  margin: 10% auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.formlogin {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 32px;
  width: 48%;
}
.formlogin > div {
  width: 100%;
  margin-bottom: 2rem;
  font-size: 2rem;
}
.formlogin > .choose {
  height: auto;
}
.loginbtn {
  width: 50%;
}
.loginbtn > div > button {
  width: 100%;
  height: 80px;
  font-size: 2.5rem;
  background-color: #313131;
  color: #ffffff;
  border: 0;
  letter-spacing: 3rem;
}
.choose {
  width: 48%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: white;
}
.choose > span {
  font-size: 0.9rem;
  cursor: pointer;
}
.formlogin >>> .ivu-form .ivu-form-item-label{
    font-weight: 800;
    font-size: 18px;
    color: #515a6e;
}
</style>