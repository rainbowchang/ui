<template>
  <div class="hello">
    <i-button @click="openFirstModal">打开第一个弹窗</i-button>
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
      openFirstModal() {
        this.$Modal.confirm({
          title: '第一个窗口',
          render: (h) => {
            return h(FirsModal, {
              ref: 'firstModal'
            })
          },
          width: 600,
          closable: false,
          okText: "确定",
          cancelText: "取消",
          loading: true,
          onOk() {
          }
        });
      }
    }
  }
</script>
<style scoped>
</style>
