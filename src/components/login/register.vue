<template>
  <div class="wrapper">
    <div class="loginbox">
      <Form ref="formDate" class="formlogin" :model="formDate" :rules="ruleInline" inline :label-width="80">
        <FormItem label="手机号" type="number" prop="mobile" class="labelCss">
            <i-input v-model="formDate.mobile" placeholder="可用于登录和找回密码">
                <i-select :model.sync="select1" slot="prepend" style="width: 80px;height: 32px;">
                    <i-option value="+86">+86</i-option>
                </i-select>
            </i-input>
        </FormItem>
        <FormItem label="用户名" prop="userName" class="labelCss">
          <i-input type="text" v-model="formDate.userName" placeholder="请设置用户名"></i-input>
        </FormItem>
        <FormItem label="密码" prop="password" class="labelCss">
          <i-input type="password" v-model="formDate.password" placeholder="请设置登录密码"></i-input>
        </FormItem>
        <FormItem label="验证码" prop="sessionCode" class="labelCss">
          <i-input  style="width: 30%;" type="number" v-model="formDate.sessionCode" placeholder="请输入验证码" ></i-input>
          <Button v-show="isSended" class="btn-default">{{sendtimer+'秒后获取'}}</Button>
          <i-button v-show="!isSended" style="margin-left: 10px;" @click="sendMoblie(formDate.mobile)">获取短信验证码</i-button>
        </FormItem>
        <FormItem class="loginbtn">
          <Button @click="handleSubmit('formDate')"><span style="margin-left: 45px;">注册</span></Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSended: false,
      sendtimer: 60,
      select1: '+86',
      single: false,
      formDate: {
        mobile: '',
        userName: '',
        password: '',
        sessionCode: ''
      },
      ruleInline: {
        userName: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        mobile: [
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
      }
    };
  },
  methods: {
    //   发送验证码
    sendMoblie(mobile) {
        if (!mobile) {
            this.$Message.error('请输入手机号！')
            return
        } else {
            // 倒计时60秒
            this.sendtimer = 60
            this.isSended = true
            setTimeout(() => {
                let timer = window.setInterval(() => {
                    if (this.sendtimer-- <= 1) {
                        this.isSended = false
                        this.sendtimer = 60
                        window.clearInterval(timer)
                    }
                }, 1000)
            })
        }
        // console.log(mobile)
    },
    // 注册
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    register(){
        this.$router.push("register")
    }
  }
};
</script>

<style scoped>
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
.formlogin >>> .ivu-form .ivu-form-item-label{
    font-weight: 800;
    font-size: 18px;
    color: #515a6e;
}
</style>