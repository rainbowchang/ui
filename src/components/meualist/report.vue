<template>
    <Form :model="formItem" :label-width="80">
        <FormItem label="日期">
            <DatePicker type="date" placeholder="选择日期" v-model="formItem.selectDate"></DatePicker>
        </FormItem>
    </Form>
</template>

<script>
export default {
    name: "report",
    data() {
        return {
            formItem: {
                selectDate: '',
            },
        }
    },
    props: ['date'],
    mounted: function () {
        this.formItem = this.date;
    },

}
</script>

<style scoped>
.wrapper {

}
</style>