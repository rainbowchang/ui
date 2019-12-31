<template>
  <div>
    <h1 align="center">添加信息</h1>

    <div>
        <span>节点信息：</span>
        <i-select v-model="nodeContent" style="width:200px" @on-change = "nodeTypeSelectCallback">
            <i-option value="customer">客户信息</i-option>
            <i-option value = "plc">机器信息</i-option>
            <i-option value = "other">自定义</i-option>
        </i-select>
    </div>

    <div v-if= "customerVisible">
        <span>客户列表：</span>
        <i-select v-model="customerName" style="width:200px" @on-change = "customerSelectCallback">
            <i-option v-for="item in customerList" :key = "item.value" :value="item.label">{{ item.label }}</i-option>
        </i-select> 
    </div>
    <br>
    <div v-if= "plcVisible">
        <span>机器信息列表：</span>
        <i-select v-model="plcSn" style="width:200px" @on-change = "plcSelectCallback">
            <i-option v-for="item in plcList" :key = "item.value" :value="item.label">{{ item.label }}</i-option>
        </i-select> 
    </div>
    <br>
    <div>
        <span>节点名称：</span>
     <!--    <i-input :value.sync="inputAlias" placeholder="请输入..." style="width: 300px" @on-change = "inputCallback"></i-input> -->
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
            nodeContent: "other"
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
     customerSelectCallback(value){
        var key = value;
        var name = value;
        if(this.inputAlias != ""){
            name = this.inputAlias;
        }
        this.$emit('showInfo', key, name, "CUSTOMER");
     },
     plcSelectCallback(value){
        var key = value;
        var name = value;
        if(this.inputAlias != ""){
            name = this.inputAlias;
        }
        this.$emit('showInfo', key, name, "LEAF");
     },
     inputCallback(){
        switch(this.nodeContent){
          case "customer":
             this.$emit('showInfo', this.customerName, this.inputAlias, "CUSTOMER");
             break;
          case "plc":
             this.$emit('showInfo', this.plcSn, this.inputAlias, "LEAF");
             break;
          case "other":
             this.$emit('showInfo', this.inputAlias, this.inputAlias, "COMPOSITE");
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
        // alert(" place holder:" + this.customerNode);
        post("/agent/view/plcsByCustomer", {"name:":this.customerNode.key}, response=>{
            console.log(response.data);
        });
     }
    }
  }
</script>
<style scoped>
</style>
