<template>
  <div class="hello">
    <Button @click="handleRender">实例化使用方法</Button>
  </div>
</template>
<script>
  const FirsModal = () => import("./FirstModal.vue");
  export default {
    name: 'HelloWorld',
    data() {
      return {}
    },
    methods: {
      handleRender () {
        this.$Modal.confirm({
          title: 'demo',
          render: (h) => {
            return h(FirsModal, {//在此处使用引入的组件
              ref: 'firstModal',
              on:{
                showInfo:() =>{
                  console.log("aaa");
                }
              }
            })
          },
          width: 600,
          closable: false,
          okText: "确定",
          cancelText: "取消",
          loading: true,
          onOk() {
            // this.$emit("showInfo");
            this.$Modal.remove();
          },
          onCancel(){
            
          }
        });
      },
      showInfo(){
        console.info("show info parent..");
      }
    }
  }
</script>
<style scoped>
</style>
