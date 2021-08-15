<template>
    <Form :model="formItem" :label-width="80" onclick="">
        <FormItem label="设备SN">
            <Input v-model="formItem.sn" placeholder="Enter something..."/>
        </FormItem>
        <FormItem label="设备名称">
            <Input v-model="formItem.name" placeholder="Enter something..."/>
        </FormItem>
        <FormItem label="终端用户ID">
            <Input v-model="formItem.userId" placeholder="Enter something..."/>
        </FormItem>
        <FormItem label="终端用户名称">
            <Input v-model="formItem.userName" placeholder="Enter something..."/>
        </FormItem>
        <FormItem label="终端用户地区">
            <Input v-model="formItem.area" placeholder="Enter something..."/>
        </FormItem>
         <FormItem label="工厂">
            <Input v-model="formItem.factory" placeholder="Enter something..."/>
        </FormItem>
         <FormItem label="车间">
            <Input v-model="formItem.workshop" placeholder="Enter something..."/>
        </FormItem>
         <FormItem label="生产线">
            <Input v-model="formItem.productLine" placeholder="Enter something..."/>
        </FormItem>
         <FormItem label="OEM厂商">
            <Input v-model="formItem.oemCompany" placeholder="Enter something..."/>
        </FormItem>
         <FormItem label="OEMID">
            <Input v-model="formItem.oemId" placeholder="Enter something..."/>
        </FormItem>
         <FormItem label="机床型号">
            <Input v-model="formItem.model" placeholder="Enter something..."/>
        </FormItem>
         <FormItem label="出厂编号">
            <Input v-model="formItem.factoryNumber" placeholder="Enter something..."/>
        </FormItem>
         <FormItem label="最大主轴转速">
            <Input v-model="formItem.maxSpindleSpeed" placeholder="Enter something..."/>
        </FormItem>
    </Form>
</template>
<script>
    // import {get} from "@/apis/restUtils"
    export default {
        data () {
            return {
                formItem: {
                    sn:"",
                    name:"",
                    userId:"",
                    userName:"",
                    area:"",
                    factory:"",
                    workshop:"",
                    productLine:"",
                    oemCompany:"",
                    oemId:"",
                    model:"",
                    factoryNumber:"",
                    maxSpindleSpeed:""
                }
            }
        },
        mounted: function() {
            this.formItem =  this.row
        },
        methods: {
            
        }
    }
</script>
