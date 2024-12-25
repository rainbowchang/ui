<script>
import {post} from "@/apis/restUtils";
export default {
  data() {
    return {
      formInline: {
        code: "",
        password: ""
      },
    }
  },
  mounted() {
    const code = (new URLSearchParams(window.location.search)).get('code');
    console.log("code: ", code);
    this.formInline.code = code
  },
  methods: {
    handleSubmit(name) {
      let Base64 = require('js-base64').Base64;
      let parameter = this.formInline;
      this.$refs[name].validate(valid => {
        parameter.password = Base64.encode(parameter.password);
        post("/wx/signOut", parameter, reponse => {
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

            if (!this.checkEndDate) {
              let router = this.$router;
              this.$Message.success("注销成功!");
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
          <FormItem prop="password">
            <i-input type="password" v-model="formInline.password" placeholder="密码11">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </i-input>
          </FormItem>
          <FormItem class="loginbtn">
            <Button @click="handleSubmit('formInline')">注销</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>