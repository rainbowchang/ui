<template>
  <div>
    <h1>客户列表</h1>
    <button @click="handleClick">
    ok,button
    </button>
    <Dropdown trigger="click" style="margin-left: 20px" @on-click="getcustomerInfos">
        <a href="javascript:void(0)">
            click 触发
            <Icon type="arrow-down-b"></Icon>
        </a>
        <Dropdown-menu slot="list">
            <Dropdown-item name = "lvdagun">驴打滚</Dropdown-item>
            <Dropdown-item name = "zhajianmian">炸酱面</Dropdown-item>
            <Dropdown-item name = "douzhi">豆汁儿</Dropdown-item>
            <Dropdown-item name = "bingtanghulou">冰糖葫芦</Dropdown-item>
            <Dropdown-item name = "beijingkaoya">北京烤鸭</Dropdown-item>
        </Dropdown-menu>
    </Dropdown>
  </div>
</template>
<script>
  export default {
    name: "customerInfos",
    data() {
      this.getRemoteCustomers();
      return {
        showModal: false
      }
    },
    methods: {	
     getcustomerInfos(name){
        // alert("hello:" + name);  
        // if(name === "lvdagun"){
           this.$emit('showInfo', name);
        // }  	
     },
     getRemoteCustomers(){
        alert("get remote customers");
     },
     handleClick () {
        this.$emit('showInfo');
      }
    }
  }
</script>
<style scoped>
</style>



