// 添加客户
<template>
  <div class="wrapper">
    <div class="top">
      <el-button type="primary" icon="el-icon-arrow-left" @click="back">上一层</el-button>
      <span>添加客户</span>
    </div>
    <div class="content">
      <Form :model="formItem" :label-width="80">
         <FormItem v-if = "customerIdVisibale" label="客户Id">
          <Input v-model="formItem.customerId" disabled placeholder="Enter something..."/>
        </FormItem>
        <FormItem label="客户名称">
          <Input v-model="formItem.name" placeholder="Enter something..."/>
        </FormItem>
        <FormItem label="客户帐号">
          <Input v-model="formItem.account" placeholder="该账号为客户登录生产管理平台的管理员手机号"/>
        </FormItem>
        <FormItem label="客户级别">
          <Select v-model="formItem.level">
            <Option value="important">重要用户</Option>
            <Option value="common">一般用户</Option>
          </Select>
        </FormItem>
        <FormItem label="用户角色">
          <Select v-model="formItem.roles" multiple>
            <Option v-for="role in roles" :value="role" :key="role">{{role}}</Option>
          </Select>
        </FormItem>
        <FormItem label="所属行业">
          <Select v-model="formItem.trade">
            <Option value="工业">工业</Option>
            <Option value="农业">农业</Option>
            <Option value="服务业">服务业</Option>
            <Option value="金融">金融</Option>
          </Select>
        </FormItem>
        <FormItem label="联系人">
          <Input v-model="formItem.linkman" placeholder="Enter something..."/>
        </FormItem>
        <FormItem label="联系电话">
          <Input v-model="formItem.tel" placeholder="Enter something..."/>
        </FormItem>
        <FormItem label="所属区域">
          <Select v-model="formItem.area" v-on="setArea(formItem.area)">
            <Option v-for="area in areas" :value="area" :key="area">{{area}}</Option>
          </Select>
        </FormItem>
        <FormItem label="省份">
          <Select v-model="formItem.province">
            <Option v-for="province in provinces" :value="province" :key="province">{{province}}</Option>
          </Select>
        </FormItem>
        <FormItem label="客户地址">
           <Input v-model="formItem.address" placeholder="Enter address..."/>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="submit">确定</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import {post, areas, getProvinceByArea} from "@/apis/restUtils";

export default {
  data() {
    return {
      formItem: {
        name: "",
        account: "",
        level: "",
        property: "",
        trade: "",
        linkman: "",
        tel: "",
        area: "",
        address: ""
      },
      areas: areas,
      customerIdVisibale: false,
      roles:["普通终端用户","高级终端用户"]
    };
  },

  mounted: function (){
      var router = this.$route;
      var customerId = router.query.customerId;
      console.log("customerId:" + customerId);
      if(customerId != undefined){
        this.formItem.customerId = customerId;
        this.customerIdVisibale = true;
        post("/customer/getById", {customerId: customerId}, response=>{
              this.formItem = response.data;
         });
      }
  },

  methods: {
    setArea(area){
      this.provinces = getProvinceByArea(area)
    },
    //返回上一层
    back() {
      this.$router.go(-1);
    },
    // 提交表单
    submit(){
      var router = this.$router;
      var parameter = this.formItem;
      post("/customer/register", parameter, function(data){
         console.log(data, "data:");
         router.push({ path: "management" });
      });
   }
 }
};
</script>
<style scoped>
.wrapper {
  width: 98%;
  height: 95%;
  border-radius: 3px;
  background-color: white;
  margin: 1% auto;
  position: relative;
}
.top {
  padding: 0 2em;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.top > span {
  font-size: 18px;
  font-weight: bold;
  margin: 0 auto;
}
.content {
  width: 60%;
  height: auto;
  position: absolute;
  top: 90px;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  padding: 2em 4em;
}
.tips{
    font-size: small;
    color: #c0c0c0;
}
</style>
