<template>
  <div id="app">
    <!-- 容器，用于将框架居中 -->
    <div class="center-container">
      <!-- 框架 -->
      <div class="content-frame">
        <!-- 这里放置要显示的内容 -->
        <p>这是框架内显示的内容。</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import {post} from "@/apis/restUtils";

export default {
  data() {
    return {
      formInline: {
        code: "",
        username: "",
        password: ""
      },
      code:"",
    }
  },
  mounted() {
    this.code = (new URLSearchParams(window.location.search)).get('code');
    post("/wx/signup", this.code, reponse => {
      let status = reponse.data.status;
      if(status === "fail"){
        //redirect to login
        this.$router.push("");
      } else {
        //redirect to machinetool list

      }
    });
  }
}
</script>

<style scoped>
/* 全局样式，让 body 占据整个视口 */
body {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f0f0;
}

/* 用于将框架居中的容器 */
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}

/* 框架样式 */
.content-frame {
  width: 60%; /* 可以根据需要调整框架宽度 */
  max-width: 600px; /* 最大宽度 */
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>