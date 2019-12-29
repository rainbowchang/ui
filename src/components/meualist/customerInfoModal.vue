<template>
  <div>
    <h1 align="center">客户列表</h1>

    <div>
        <span>节点信息：</span>
        <i-select :model.sync="nodeType" style="width:200px" @on-change = "nodeTypeSelectCallback">
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
        <i-input :value.sync="inputAlias" placeholder="请输入..." style="width: 300px" @on-blur = "inputCallback"></i-input>
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
            inputAlias: "",
            customerVisible: false,
            plcVisible: false,
            nodeType: "COMPOSITE"
        }
    },
    props: ['customerNode'],
    mounted: function(){
         // this.getRemotePlcs();
    },
    methods: {  
     nodeTypeSelectCallback(value){
        switch(value){
            case "customer":
              this.customerVisible = true;
              this.plcVisible = false;
              this.getRemoteCustomers();
              return "CUSTOMER";
            case "plc":
              this.customerVisible = false;
              this.plcVisible = true;
              this.getRemotePlcs();
              return "LEAF";
            case "other":
              return "COMPOSITE";
            default:
               break;
        }
        return "";
     },
     customerSelectCallback(value){
        this.customerName = value;
        this.nodeType = "CUSTOMER";
        this.$emit('showInfo', value, this.inputAlias, "CUSTOMER");
     },
     plcSelectCallback(value){
        this.plcSn = value;
        this.nodeType = "LEAF";
        this.$emit('showInfo', value,this.inputAlias, "LEAF");
     },
     inputCallback(alias){
        this.inputAlias = alias;
        switch(this.nodeType){
          case "CUSTOMER":
             alert(" node is :" + this.customerName + " alias:" + alias + " type:" +  this.nodeType);
             this.$emit('showInfo', this.customerName, alias, this.nodeType);
             break;
          case "LEAF":
             this.$emit('showInfo', this.plcSn, alias, this.nodeType);
             break;
          case "COMPOSITE":
             this.$emit('showInfo', alias, alias, this.nodeType);
            break;
          default:
             break;
        }
     
     },
     getRemoteCustomers(){
        get("/customer/getAll", response=>{
           console.log(response.data);
        });
     },
     getRemotePlcs(){
        alert(" place holder:" + this.customerNode);
        post("/agent/view/plcsByCustomer", {"name:":this.customerNode.name}, response=>{
            console.log(response.data);
        });
     }
    }
  }
</script>
<style scoped>
</style>
