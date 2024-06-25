<template>
    <Form  :label-width="80">
        <FormItem label="日期">
            <DatePicker type="daterange"
                        placeholder="请选择开始日期——结束日期"
                        @on-change="changedate"
            ></DatePicker>
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
    methods: {
        changedate(e){
            this.formItem.selectDate = e;
        }
    }

}
</script>

<style scoped>
.wrapper {

}
</style>