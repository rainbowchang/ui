
//https://blog.csdn.net/qq_43314341/article/details/131226622

<script>
import {post} from "@/apis/restUtils";

export default {
  data() {
    return {
      formInline: {
        phoneNumber: "",
        password: ""
      },
      appid: "",


    }

  },
  mounted() {
    const code = (new URLSearchParams(window.location.search)).get('code');
    console.log("code: ", code);
    this.appid = code
  },
  methods: {

    handleSubmit(name) {
      let Base64 = require('js-base64').Base64;
      let parameter = this.formInline;
      this.$refs[name].validate(valid => {
        parameter.password = Base64.encode(parameter.password);
        post("/user/login", parameter, reponse => {
          let data = reponse.data
          if (data != null) {
            this.userInfo.registerDate = new Date(data.registerDate);
            this.userInfo.endDate = new Date(data.endDate);
            let validResult = this.checkValidDate(this.userInfo);
            if (!validResult) {
              return;
            }
          }
          if (valid && data.status === "success") {
            this.canLogin = true;
            localStorage.setItem("UserName", parameter.username);
            localStorage.setItem("UserId", data.userId);
            localStorage.setItem("Flag", true);
            if (!this.checkEndDate) {
              let router = this.$router;
              this.$Message.success("登录成功!");
              router.push({path: "/index"});
            }
          } else {
            this.canLogin = false;
            this.$Message.error("用户名或密码错误!");
          }
        });
      });
    },
  }
}
</script>

<template>
  <div class="wrapper">
    <div class="loginbox">
      <div class="loginbox">
<!--        <div class="imgbox"></div>-->
        <Form ref="formInline" class="formlogin" :model="formInline" :rules="ruleInline" inline>
          <div>appid: {{appid}}</div>
          <FormItem prop="username">
            <i-input type="text" v-model="formInline.phoneNumber" placeholder="手机号码">
              <Icon type="ios-call-outline" slot="prepend"></Icon>
            </i-input>
          </FormItem>
          <FormItem prop="password">
            <i-input type="password" v-model="formInline.password" placeholder="密码11">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </i-input>
          </FormItem>
          <FormItem class="loginbtn">
            <Button @click="handleSubmit('formInline')">登录</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<style scoped>


.loginbox {
  width: 75%;
  height: auto;
  margin: 10% auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.imgbox {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  background-color: aliceblue;
  background-image: url("../../assets/imgs/icon001.png");
  background-position: -18px 0;
}

.linkPage {
  position: absolute;
  right: 5px;
  top: 5px;
  width: 210px;
  height: 30px;
}

.link1 {
  position: absolute;
  left: 5px;
  top: 5px;
  font-size: 1rem;
}

.link2 {
  position: absolute;
  left: 100px;
  top: 5px;
  font-size: 1rem;
}

.qrbox {
  position: absolute;
  left: 1px;
  top: 30px;
  width: 90px;
  height: 90px;
  /*border-radius: 50%;*/
  overflow: hidden;
  background-color: aliceblue;
  background-image: url("../../assets/imgs/QRGZH.jpg");
  background-size: 90px 90px;
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
  width: 60%;
}

.loginbtn > div > button {
  width: 100%;
  height: 80px;
  font-size: 1.5rem;
  background-color: #ffffff;
  color: #313131;
  border: 0;
  /* letter-spacing: 3rem; */
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
</style>