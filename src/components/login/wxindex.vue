<script setup>
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


  }
}
</script>

<template>
  <div class="wrapper">
    <div class="loginbox">
      <div class="loginbox">
        <Form ref="formInline" class="formlogin" :model="formInline" :rules="ruleInline" inline>
          <FormItem prop="username">
            <i-input type="text" v-model="formInline.username" placeholder="用户名">
              <Icon type="ios-call-outline" slot="prepend"></Icon>
            </i-input>
          </FormItem>
          <FormItem prop="password">
            <i-input type="password" v-model="formInline.password" placeholder="密码">
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

</style>