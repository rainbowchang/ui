<template>
    <Form :model="formItem" :label-width="80">
        <FormItem label="设备SN">
            <Input v-model="formItem.sn" placeholder="..."/>
        </FormItem>
        <FormItem label="设备名称">
            <Input v-model="formItem.name" placeholder="..."/>
        </FormItem>
        <FormItem label="终端用户ID">
            <Input v-model="formItem.userId" placeholder="..."/>
        </FormItem>
        <FormItem label="终端用户名称">
            <Input v-model="formItem.userName" placeholder="..."/>
        </FormItem>
        <FormItem label="终端用户地区">
            <Input v-model="formItem.area" placeholder="..."/>
        </FormItem>
        <FormItem label="所属">
            <!--            <Input v-model="formItem.orgId" placeholder="..."/>-->
            <el-select v-model="formItem.orgId" filterable clearable placeholder="..." style="width: 100%">
                <el-option v-for="item in orgList" :key="item.id" :label="item.name" :value="item.id">
                    <span style="float: left">{{ item.name }}</span>
                </el-option>
            </el-select>
        </FormItem>
        <FormItem label="OEM厂商">
            <Input v-model="formItem.oemCompany" placeholder="..."/>
        </FormItem>
        <FormItem label="OEMID">
            <Input v-model="formItem.oemId" placeholder="..."/>
        </FormItem>
        <FormItem label="机床型号">
            <!--            <Input v-model="formItem.model" placeholder="..."/>-->
            <el-select v-model="formItem.model" filterable allow-create clearable placeholder="..." style="width: 100%">
                <el-option v-for="item in modelList" :key="item" :label="item" :value="item">
                    <span style="float: left">{{ item }}</span>
                </el-option>
            </el-select>
        </FormItem>
        <FormItem label="PLC型号">
            <el-select v-model="formItem.plcType" filterable allow-create clearable placeholder="..."
                       style="width: 100%">
                <el-option v-for="item in plcTypeList" :key="item" :label="item" :value="item">
                    <span style="float: left">{{ item }}</span>
                </el-option>
            </el-select>
        </FormItem>
        <FormItem label="主轴最大转速">
            <Input v-model="formItem.maxSpindleSpeed" placeholder="..."/>
        </FormItem>
        <FormItem label="限制码">
            <Input v-model="formItem.lockCode" placeholder="Enter something..."/>
        </FormItem>
        <FormItem label="限制标识">
            <el-select v-model="formItem.lockFlag" filterable allow-create clearable placeholder="..."
                       style="width: 100%">
                <el-option v-for="item in lockFlagList" :key="item.id" :label="item.name" :value="item.id">
                    <span style="float: left">{{ item.name }}</span>
                </el-option>
            </el-select>
        </FormItem>
    </Form>
</template>
<script>
import {post} from "@/apis/restUtils"

export default {
    data() {
        return {
            formItem: {
                sn: "",
                name: "",
                userId: "",
                userName: "",
                area: "",
                factory: "",
                workshop: "",
                productLine: "",
                oemCompany: "",
                oemId: "",
                model: "",
                factoryNumber: "",
                maxSpindleSpeed: "",
                lockCode: "",
                lockFlag: ""
            },
            plcTypeList: [],
            modelList: [],
            orgList: [],
            lockFlagList: []
        }
    },
    props: ['row'],
    mounted: function () {
        console.log("deviceInfo:", this.row)
        this.formItem = this.row;
        post("/plcInfo/getAllPlcType", {}, response => {
            this.plcTypeList = response.data;
        });
        post("/plcInfo/getAllMachinetoolModel", {}, response => {
            this.modelList = response.data;
        });
        post("/organization/getOrganiztionOfMenuItem", {}, response => {
            this.orgList = response.data;
        });
        this.lockFlagList = [{"id": "true", "name": "授权"}, {"id": "false", "name": "不授权"}];
    },
    methods: {}
}
</script>
