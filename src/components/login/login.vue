<template>
<!-- 登录 -->
  <div class="wrapper">
    <div class="loginbox">
      <div class="imgbox"></div>
      <Form ref="formInline" class="formlogin" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="username">
          <i-input type="text" v-model="formInline.username" placeholder="用户名">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </i-input>
        </FormItem>
        <FormItem prop="password">
          <i-input type="password" v-model="formInline.password" placeholder="密码">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </i-input>
        </FormItem>
        <div class="choose">
          <Checkbox v-model="single">记住密码</Checkbox>
          <span>找回密码</span>
          <span @click="register">用户注册</span>
        </div>
        <FormItem class="loginbtn">
          <Button @click="handleSubmit('formInline')">登陆</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import {post} from "@/apis/restUtils"
export default {
  data() {
    return {
      single: false,
      formInline: {
        username: "",
        password: ""
      },
      ruleInline: {
        username: [
          {
            required: true,
            message: "请输入用户名",
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
      }
    };
  },
  methods: {
    handleSubmit(name) {
      var router = this.$router;
      var parameter = this.formInline;  
      this.$refs[name].validate(valid => {
          post("/user/login",parameter,reponse => {
            if (valid && reponse.data.status == "success") {
              localStorage.setItem("UserName", parameter.username);
              localStorage.setItem("Flag", true);
              this.$Message.success("登陆成功!");
              router.push({path: "/index"});  
          } else {
              this.$Message.error("用户名或密码错误!");
          }
        });
      });
    },
    register(){
      this.$router.push("register")
    }
  }
};
</script>

<style  scoped>
.wrapper {
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
.imgbox {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  background-color: aliceblue;
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
</style>