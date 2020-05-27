<template>
    <Form :model="formItem" :label-width="80">
        <FormItem label="name">
            <Input v-model="formItem.name" placeholder="Enter something..."/>
        </FormItem>
        <FormItem label="type">
            <Select v-model="formItem.type">
                <Option value="user_api">API</Option>
                <Option value="user_web_page">WEB</Option>
            </Select>
        </FormItem>
        <FormItem label="content">
            <Input v-model="formItem.content" placeholder="Enter something..."/>
        </FormItem>
        <FormItem label="description">
            <Input v-model="formItem.description" placeholder="Enter something..."/>
        </FormItem>
    </Form>
</template>
<script>
    export default {
        data () {
            return {
                formItem: {
  
                },
            }
        },
        props: ['row'],
        mounted: function() {
            console.log("abilityManager", this.row)
            this.formItem = this.row
        },
        methods: {
            
        }
    }
</script>
