<template>
    <Form :model="formItem" :label-width="80">
        <FormItem label="ID">
            <Input v-model="formItem.customerId" placeholder="Enter something..."/>
        </FormItem>
        <FormItem label="name">
            <Input v-model="formItem.name" placeholder="Enter something..."/>
        </FormItem>
        <FormItem label="address">
            <Input v-model="formItem.address" placeholder="Enter something..."/>
        </FormItem>
        <FormItem label="tel">
            <Input v-model="formItem.tel" placeholder="Enter something..."/>
        </FormItem>
        <FormItem label="company">
            <Input v-model="formItem.company" placeholder="Enter something..."/>
        </FormItem>
        <FormItem label="roles">
            <CheckboxGroup v-model="formItem.roles">
                <Checkbox v-for="role in roles" :key="role" :label=role></Checkbox>
            </CheckboxGroup>
        </FormItem>
    </Form>
</template>
<script>
    import {get} from "@/apis/restUtils"
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
            console.log("userManager", this.row)
            this.formItem = this.row
            get("/admin/getAllRoleNames", reponse => {
                this.roles = []
                this.roles = reponse.data;
                console.log(reponse.data);
            })
        },
        methods: {
            
        }
    }
</script>
