<template>
  <Form :model="formItem" :label-width="80">
    <FormItem label="名称">
      <Input v-model="formItem.name" placeholder="..."/>
    </FormItem>
    <FormItem label="所属日期">
      <DatePicker type="date" placeholder="Select time" v-model="formItem.scheduleDate"></DatePicker>
    </FormItem>
    <FormItem label="开始时间">
      <DatePicker type="datetime" placeholder="Select time" v-model="formItem.beginTime"></DatePicker>
    </FormItem>
    <FormItem label="结束时间">
      <DatePicker type="datetime" placeholder="Select time" v-model="formItem.endTime"></DatePicker>
    </FormItem>
  </Form>
</template>

<script>
export default {
  name: "editScheduleInstModal",
  data() {
    return {
      formItem: {
        name: '',
        scheduleDate: '',
        beginTime: '',
        endTime: '',
      },
    }
  },
  props: ['row'],
  mounted: function () {
    this.formItem = this.row;
  },
  methods: {},
  watch: {}

}
</script>

<style scoped>

</style>