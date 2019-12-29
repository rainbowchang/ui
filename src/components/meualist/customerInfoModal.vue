<template>
  <div>
    <h1 align="center">客户列表</h1>

    <div>
        <span>新建节点内容：</span>
        <i-select :model.sync="type" style="width:200px" @on-change = "nodeTypeSelectCallback">
            <i-option value="customer">客户信息</i-option>
            <i-option value = "plc">机器信息</i-option>
            <i-option value = "other">自定义</i-option>
        </i-select>
    </div>

    <div v-if= "customerVisible">
        <span>客户列表：</span>
        <i-select :model.sync="customerName" style="width:200px" @on-change = "customerSelectCallback">
            <i-option v-for="item in customerList" :key = "item.value" :value="item.label">{{ item.label }}</i-option>
        </i-select> 
    </div>
    <br>
    <div v-if= "plcVisible">
        <span>机器信息列表：</span>
        <i-select :model.sync="plcSn" style="width:200px" @on-change = "plcSelectCallback">
            <i-option v-for="item in plcList" :key = "item.value" :value="item.label">{{ item.label }}</i-option>
        </i-select> 
    </div>
    <br>
    <div>
        <span>别名：</span>
        <i-input :value.sync="inputValue" placeholder="请输入..." style="width: 300px" @on-blur = "inputCallback"></i-input>
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
                    value: 'sn-001',
                    label: 'sn-001'
                },
                {
                    value: 'sn-002',
                    label: 'sn-002'
                },
                {
                    value: 'sn-003',
                    label: 'sn-003'
                }
            ],
            customerList: [
                {
                    value: 'customer-001',
                    label: '客户一'
                },
                {
                    value: 'customer-002',
                    label: '客户二'
                },
                {
                    value: 'customer-003',
                    label: '客户三'
                }
            ],
            customerName: '',
            plcSn: '',
            inputValue: "",
            customerVisible: false,
            plcVisible: false
        }
    },
    props: ['customerNode'],
    mounted: function(){
         // this.getRemotePlcs();
    },
    methods: {  
     nodeTypeSelectCallback(value){
        alert("value is :" + value);
     },
     customerSelectCallback(value){
        this.plc = value;
        this.$emit('showInfo', value);
     },
     plcSelectCallback(value){
        this.plc = value;
        this.$emit('showInfo', value);
     },
    
     inputCallback(value){
        alert("inut plc:" + this.plc);  
        this.inputValue = value;
        this.$emit('showInfo', value);
     },
     getRemoteCustomers(){
        get("/customer/getAll", response=>{
           console.log(response.data);
        });
     },
     getRemotePlcs(){
        alert(" place holder:" + this.customerNode);
        post("/agent/view/plcsByCustomer", {"name:":customerNode.name}, response=>{
            console.log(response.data);
        });
     }
    }
  }
</script>
<style scoped>
</style>
