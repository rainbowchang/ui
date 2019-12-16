<template>
  <div>
    <h1>我second个窗口</h1>
  </div>
</template>
<script>
  export default {
    props: ['modalstatus'],
    name: "secondModal",
    data() {
      return {}
    },
    methods:{
       ok(){
        alert("hello");
           this.$Message.info("second canncel close" + this.modalstatus);
       },
        cancel(){
           this.$Message.info("second canncel close");
        }
    }
  }
</script>
<style scoped>
</style>