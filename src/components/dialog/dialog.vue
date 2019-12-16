<template>
  <div>
    <i-button type="primary" @click="modal1 = true">普通组件使用方法</i-button>
    <Modal
      v-model="modal1"
      title="普通组件使用方法"
      @on-ok="ok"
      @on-cancel="cancel">
      <!-- <h1>普通组件使用方法</h1> //自定义内容 -->
       <p>对话框内容</p>
        <p>对话框内容</p>
        <p>对话框内容</p>
    </Modal>
  </div>
</template>
<script>
  export default {
    name: "normalModal",
    data() {
      return {
        modal1: false
      }
    },
    methods: {
      ok() {
        this.$Message.info('点击了确定');
      },
      cancel(){
        this.$Message.info('点击了取消');
      }
    }
  }
</script>
