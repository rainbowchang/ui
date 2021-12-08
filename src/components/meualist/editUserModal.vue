<template>
    <Form :model="user" :label-width="80">
        <FormItem label="姓名：">
            <Input v-model="user.name" placeholder="..."/>
        </FormItem>
        <FormItem label="用户名：">
            <Input v-model="user.username" placeholder="..." :disabled="isModify"/>
        </FormItem>
        <FormItem label="密码：">
            <Input v-model="user.password" placeholder="..." type="password" password/>
        </FormItem>
        <FormItem label="电话：">
            <Input v-model="user.tel" placeholder="..."/>
        </FormItem>
        <FormItem label="所属">
            <Select v-model="selectOrgId" filterable clearable placeholder="..." style="width: 100%" @on-select="menuItemChange">
                <Option v-for="item in orgList" :value="item.id" :key="item.id">
                    {{ item.name }}
                </Option>
            </Select>
        </FormItem>
        <FormItem label="权限：">
            <CheckboxGroup v-model="selectRoles" @on-change="checkboxChange">
                <Checkbox v-for="role in roles" :key="role.id" :label=role.id>{{ role.name }}</Checkbox>
            </CheckboxGroup>
        </FormItem>

    </Form>
</template>

<script>
import {post} from "@/apis/restUtils"

export default {
    name: "editUserModal",
    data() {
        return {
            user: {
                name: '',
                username: '',
                password: '',
                tel: '',
                orgId: '',
                roles: [],
            },
            roles: [],
            selectRoles: [],
            selectOrgId: '',
            orgList: [],
        }
    },
    props: ['row', 'isModify'],
    mounted: function () {
        this.user = this.row;
        if (this.isModify) {
            post("/admin/getUserRoles", this.user, response => {
                this.selectRoles = response.data.entity;
            });
            post("/admin/getUserOrganization", this.user, response => {
                console.log("this.user.orgId....", this.user.orgId);
                this.selectOrgId = response.data.orgId;
            });
        }
        post("/admin/getAllRoles", {}, response => {
            this.roles = response.data;
        });
        post("/organization/getOrganiztionOfMenuItem", {}, response => {
            this.orgList = response.data;
        });
    },
    methods: {
        checkboxChange(data) {
            this.selectRoles = data;
            this.user.roles = this.selectRoles;
        },

        menuItemChange(data){
            this.selectOrgId = data;
            this.user.orgId = this.selectOrgId;
            console.log("this.user.orgId... ", this.user.orgId, "this.selectOrgId... ", this.selectOrgId);
        }
    }
}
</script>

<style scoped>

</style>