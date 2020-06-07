<template>
  <div>
    <h1 align="center">添加信息</h1>

    <div>
        <span>节点信息：</span>
        <i-select v-model="nodeContent" style="width:200px" @on-change = "nodeTypeSelectCallback">
            <i-option v-for="item in nodeContentList" :key = "item.value" :value="item.value">{{ item.label }}</i-option>
        </i-select>
    </div>
    <br>
    <div v-if= "customerVisible" style="padding-top: 10px">
        <span>客户列表：</span>
        <i-select :label-in-value="true" v-model="customerId" style="width:200px"  @on-change = "customerSelectCallback">
            <i-option v-for="item in customerList" :key = "item.key" :value="item.key">{{ item.label }}</i-option>
        </i-select> 
    </div>
    <br>
    <div v-if= "plcVisible">
        <span>机器信息列表：</span>
        <i-select v-model="plcSn" style="width:200px" @on-change = "plcSelectCallback">
            <i-option v-for="item in plcList" :key = "item.label" :value="item.label">{{ item.label }}</i-option>
        </i-select> 
    </div>
    <br>
    <div>
        <span>节点名称：</span>
         <Input v-model="inputAlias" placeholder="Enter something..." style="width: 300px" @on-blur = "inputCallback"/>
    </div>
  </div>
</template>
<script>
 import {get,post} from "@/apis/restUtils";

  export default {
    name: "customerInfos",
    data() {
       return {
            plcList: [
                {
                    label: 'sn-001'
                },
                {
                    label: 'sn-002'
                },
                {
                    label: 'sn-003'
                }
            ],
            customerList: [
                {
                    label: '客户一'
                },
                {
                    label: '客户二'
                },
                {
                    label: '客户三'
                }
            ],
            nodeContentList: [],
            customerId: '',
            plcSn: '',
            inputAlias: "",
            customerVisible: false,
            plcVisible: false,
            nodeContent: "other"
        }
    },
    props: ['customerNode',"parentNode"],
    mounted: function(){

        if(this.customerNode != null){
          console.log("customer node is:" + this.customerNode.name);
          this.customerId = this.customerNode.key;
          this.nodeContentList = [
                {
                    value: 'plc',
                    label: '机器信息'
                },
                {
                    value: 'other',
                    label: '自定义'
                }
            ];
        }else{
            this.nodeContentList = [
                {
                    value: 'customer',
                    label: '客户信息'
                },
                {
                    value: 'other',
                    label: '自定义'
                }
            ];
        }
    },
    methods: {  
     nodeTypeSelectCallback(value){
        switch(value){
            case "customer":
              this.customerVisible = true;
              this.plcVisible = false;
              this.getRemoteCustomers();
              return;
            case "plc":
              this.customerVisible = false;
              this.plcVisible = true;
              this.getRemotePlcs();
              return;
            case "other":
              this.customerVisible = false;
              this.plcVisible = false;
              return;
            default:
               break;
        }
        return "";
     },
     customerSelectCallback(val){
        console.log("label:" + val.label + " value:" + val.value)
        var key = val.value;
        var name = val.label;
        if(this.inputAlias != ""){
            name = this.inputAlias;
        }else{
          this.inputAlias = name;
        }
        this.$emit('showInfo', key, name, "CUSTOMER");
     },
     plcSelectCallback(value){
        var key = value;
        var name = value;
        if(this.inputAlias != ""){
            name = this.inputAlias;
        }else{
          this.inputAlias =  name;
        }
        this.$emit('showInfo', key, name, "LEAF");
     },
     inputCallback(){
        switch(this.nodeContent){
          case "customer":
             if(this.customerId == "" || this.customerId == null){
                this.$emit('showInfo', this.inputAlias, this.inputAlias, "COMPOSITE");
                return;
             }
             this.$emit('showInfo', this.customerId, this.inputAlias, "CUSTOMER");
             break;
          case "plc":
             if(this.plcSn == "" && this.plcSn == null){
                this.$emit('showInfo', this.inputAlias, this.inputAlias, "COMPOSITE");
                return;
             }
             this.$emit('showInfo', this.plcSn, this.inputAlias, "LEAF");
             break;
          case "other":
             this.$emit('showInfo', this.inputAlias, this.inputAlias, "COMPOSITE");
             break;
          default:
             break;
        }
     
     },
     getCustomerFeature(){
       var customerBean ={};
       console.log(this.parentNode, "customernNodePara");
       var parent = this.parentNode;
       if(parent == null){
         return customerBean;
       }
       switch(parent.key){
          case "一般客户":
            customerBean.feature = "common";
            break;
          case "重要客户":
            customerBean.feature = "important";
            break;
          default:
            customerBean.feature = parent.key;
            break;
        }
        return customerBean;
     },
     getRemoteCustomers(){
        // var customerBean = this.getCustomerFeature();
        get("/customer/getCustomerByFeature", response=>{
           console.log(response.data, "customerList");
           this.customerList = response.data;
        });
     },
     getRemotePlcs(){
        console.log('customer key: ', this.customerNode.key);
        post("/agent/view/plcsByCustomer", {"name":this.customerNode.name}, response=>{
            this.plcList = response.data;
        });
     }
    }
  }
</script>
<style scoped>
</style>
