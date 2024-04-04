<template>
    <Form  :label-width="80">
        <FormItem label="日期">
            <DatePicker type="date"
                        placeholder="选择日期"
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
            console.log(e);
            this.formItem.selectDate = e;
        }
    }

}
</script>

<style scoped>
.wrapper {

}
</style>