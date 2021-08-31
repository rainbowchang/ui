<template>
<!-- 登录 -->
  <div class="wrapper">

    <div class="linkPage">
      <a class="link1" @click="linkGzhClick"><span>微信公众号</span></a>  <a class="link2" @click="linkDownloadClick"><span>应用下载</span></a>
      <div class="qrbox" v-show="showFlag"></div>
    </div>
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
          <!-- <span>找回密码</span> -->
          <span @click="register">用户注册</span>
        </div>
        <FormItem class="loginbtn">
          <Button @click="handleSubmit('formInline')">登录</Button>
        </FormItem>
      </Form>
       <Modal v-model="checkEndDate" title="用户超期提醒"
             @on-ok="onok"
             @on-cancel="OnCancel">
            <p>你的用户注册时间是：{{formatDate(this.userInfo.registerDate, "yyyy-MM-dd")}}</p>
            <p>你的截止时间是：{{formatDate(this.userInfo.endDate,"yyyy-MM-dd")}}</p>
            <p>{{this.checkResult}}</p>
      </Modal>
    </div>
  </div>
</template>

<script>
import {post} from "@/apis/restUtils"
export default {
  data() {
    return {
      checkEndDate:false,
      checkResult:"",
      canLogin:false,
      userInfo:{
        registerDate: new Date("2020-09-09"),
        endDate: new Date("2020-08-19")
      },
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
      },
      showFlag: false
    };
  },
  mounted:function(){
      this.canLogin = false;
  },
  methods: {
    onok(){
      if(this.canLogin){
        var router = this.$router;
        this.$Message.success("登录成功!");
        router.push({path: "/index"});  
      }
    },
    OnCancel(){
      
    },
    handleSubmit(name) {
      var parameter = this.formInline;  
      this.$refs[name].validate(valid => {
          post("/user/login",parameter,reponse => {
            let data = reponse.data
            if(data != null){
              this.userInfo.registerDate = new Date(data.registerDate);
              this.userInfo.endDate = new Date(data.endDate);
              //alert("userInfo:" + JSON.stringify(this.userInfo));
              let validResult = this.checkValidDate(this.userInfo);
              if(!validResult){
                  return;
              }
            }
            if (valid && data.status == "success") {
                 this.canLogin = true;
                 localStorage.setItem("UserName", parameter.username);
                 localStorage.setItem("UserId", data.userId);
                 localStorage.setItem("Flag", true);
                 if(!this.checkEndDate){
                    var router = this.$router;
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
    checkValidDate(userInfo){
      let registerDate = userInfo.registerDate;
      let endDate = userInfo.endDate;
      if(registerDate == null || endDate == null){
         return true;
      }
      let now = new Date();
      // let now = new Date("2020-11-11");
      let result = endDate >= now;
      if(result){
          let leftDays = this.getDays(now, endDate);
          if( leftDays <= 10){
              this.checkResult = "友好提醒： 您的账户在" + leftDays 
                                  + "天后过期， 请您及时续费，以便继续使用，谢谢。";
              this.checkEndDate = true;
          }
          return true;
      } 
      this.checkResult = "对不起，您的账户已经到期，请您尽快续费，以便继续使用，谢谢。";
      this.checkEndDate = true;
      return false;
    },
    register(){
      this.$router.push("register")
    },
    getDays(date, other){
      var t1 = date.getTime();
      var t2 = other.getTime();
      var dayTime = 1000*60*60*24; 
      var minusDays = Math.floor(((t2-t1)/dayTime));
      var days = Math.abs(minusDays);
      return days;
    },
    formatDate(date, fmt){
      if(date == null){
        return "";
      }
       var o = {
          "M+" : date.getMonth()+1,                 //月份
          "d+" : date.getDate(),                    //日
          "h+" : date.getHours(),                   //小时
          "m+" : date.getMinutes(),                 //分
          "s+" : date.getSeconds(),                 //秒
          "q+" : Math.floor((date.getMonth()+3)/3), //季度
          "S"  : date.getMilliseconds()             //毫秒
        };

        if(/(y+)/.test(fmt)){
          fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
        }
              
        for(var k in o){
          if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(
              RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));  
          }       
        }

        return fmt;
    },
    linkGzhClick(){
      this.showFlag = !this.showFlag;
    },
    linkDownloadClick(){
      this.$router.push("download_home");
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
  background-image: url("../../assets/imgs/icon001.png");
  background-position: -18px 0;
}

.linkPage{
  position: absolute;
  right: 5px;
  top: 5px;
  width: 210px;
  height: 30px;
}

.link1{
  position: absolute;
  left: 5px;
  top: 5px;
  font-size: 1rem;
}

.link2{
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
  background-size: 90px  90px;
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
