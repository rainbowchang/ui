<template>
  <Form :model="formItem" :label-width="80">
    <FormItem label="名称">
      <Input v-model="formItem.name" placeholder="..."/>
    </FormItem>
    <FormItem label="开始时间">
      <TimePicker type="time" placeholder="Select time" v-model="beginTimeStr"></TimePicker>
    </FormItem>
    <FormItem label="结束时间">
      <TimePicker type="time" placeholder="Select time" v-model="endTimeStr"></TimePicker>
    </FormItem>
  </Form>
</template>

<script>
import { timeToString, StringToTime} from "@/apis/restUtils";
export default {
  name: "editSchedulePlanModal",
  data() {
    return {
      formItem: {
        name: '',
        beginTime: '',
        endTime: '',
        organizationId: '',
      },
      beginTimeStr:'',
      endTimeStr:'',
    }
  },
  props: ['row'],
  mounted: function () {
    this.formItem = this.row;
  },
  methods: {},
  watch: {
    formItem(val) {
      this.beginTimeStr = timeToString(val.beginTime);
      this.endTimeStr = timeToString(val.endTime);
    },
    beginTimeStr(val) {
      let time = StringToTime(val);
      console.log("beginTimeStr............", time);
      this.formItem.beginTime = time;
    },
    endTimeStr(val) {
      let time = StringToTime(val);
      console.log("endTimeStr............", time);
      if (time < this.formItem.beginTime) {
        time = time + 3600 * 24;
      }
      this.formItem.endTime = time;
    }
  }
}
</script>

<style scoped>

</style>