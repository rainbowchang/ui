<template>
  <div>
    <h1>第一个窗口</h1>
    <button @click="handleClick">
    ok,button
    </button>
    <Button @click="openSecondModal">打开第二个弹窗</Button>
    <Modal v-model="showModal"  
      @on-ok="ok"
      @on-cancel="cancel">
      <SecondModal></SecondModal>
    </Modal>
  </div>
</template>
<script>
  const SecondModal = () => import("./SecondModal.vue");
  export default {
    name: "FirstModal",
    data() {
      return {
        showModal: false
      }
    },
    components: {
      SecondModal
    },
    methods: {
      handleClick () {
        this.$emit('showInfo');
      },
      openSecondModal() {
        this.showModal = true;
      },
      updateStatus(){
         console.info("hello update status..");
      },
      ok() {
        this.$emit("showInfo");
        // this.$Message.info('xiaowen点击了确定');

      },
      cancel(){
        this.$Message.info('点击了取消');
      }
    }
  }
</script>
<style scoped>
</style>
