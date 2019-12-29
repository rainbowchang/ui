<template>
  <div>
    <h1 align="center">Plc列表</h1>
    <div>
        <span>plc列表选择：</span>
        <i-select :model.sync="plc" style="width:200px" @on-change = "selectCallback">
            <i-option v-for="item in plcList" :key = "item.value" :value="item.label">{{ item.label }}</i-option>
        </i-select>
        <br>
        <span>别名：</span>
        <i-input :value.sync="inputValue" placeholder="请输入..." style="width: 300px" @on-blur = "inputCallback"></i-input>
      </div>>
  </div>
</template>
<script>
  export default {
    name: "plcInfos",
    data() {
       return {
            plcList: [
                {
                    value: 'hangzhou',
                    label: '杭州市'
                },
                {
                    value: 'nanjing',
                    label: '南京市'
                },
                {
                    value: 'chongqing',
                    label: '重庆市'
                }
            ],
            plc: '',
            inputValue: "xiaoyu"
        }
    },
    mounted: function(){
         this.getRemotePlcs();
    },
    methods: {	
     selectCallback(value){
        this.plc = value;
        this.$emit('showInfo', value);
     },
     inputCallback(value){
        alert("inut plc:" + this.plc);  
        this.inputValue = value;
        this.$emit('showInfo', value);
     },
     getRemotePlcs(){
        console.log("get remote customers");
     }
    }
  }
</script>
<style scoped>
</style>



