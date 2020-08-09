<template>
    <Form :model="formItem" :label-width="80">
        <FormItem label="用户ID">
            <Input v-model="formItem.customerId" placeholder="Enter something..."/>
        </FormItem>
        <FormItem label="用户名称">
            <Input v-model="formItem.name" placeholder="Enter something..."/>
        </FormItem>
        <FormItem label="地址">
            <Input v-model="formItem.address" placeholder="Enter something..."/>
        </FormItem>
        <FormItem label="联系方式">
            <Input v-model="formItem.tel" placeholder="Enter something..."/>
        </FormItem>
        <FormItem label="公司">
            <Input v-model="formItem.company" placeholder="Enter something..."/>
        </FormItem>
        <FormItem label="注册时间">
            <Input v-model="formItem.registerDate" placeholder="Enter something..."/>
        </FormItem>
        <FormItem label="有效截止日期">
            <!-- <Input v-model="formItem.endDate" placeholder="Enter something..."/> -->
            <DatePicker v-model="formItem.endDate"  type="date" multiple placeholder="Select date" style="width: 300px" @on-change="onEndDate"></DatePicker>
        </FormItem>
        <FormItem label="角色">
            <CheckboxGroup v-model="formItem.roles">
                <Checkbox v-for="role in roles" :key="role" :label=role></Checkbox>
            </CheckboxGroup>
        </FormItem>
    </Form>
</template>
<script>
    // import {get} from "@/apis/restUtils"
    export default {
        data () {
            return {
                formItem: {
                    roles:[]
                },
                roles: [
                    "普通用户","aaa","bbb","ccc"
                ],
            }
        },
        props: ['row'],
        mounted: function() {
            // console.log("userManager", this.row)
            // this.formItem = this.row
            // get("/admin/getAllRoleNames", reponse => {
            //     this.roles = []
            //     this.roles = reponse.data;
            //     console.log(reponse.data);
            // })
        },
        methods: {
            onEndDate(date){
                alert("date:" + date);
                this.formItem.endDate = date;
                alert(JSON.stringify(this.formItem));
            }
        }
    }
</script>
